import { Injectable } from "@nestjs/common";
import { PaginationArgs } from "src/common/paginate/connection-paging";
import { BaseCRUDService } from "src/common/service/crud/base.service";
import { resolveArrField, resolveField } from "src/common/utils/utils";
import { Category } from "src/sys/category/category.entity";
import { User } from "src/user/userInfo/user.entity";
import { UserItem } from "src/user/userItem/user-item.entity";
import { UserRecord } from "src/user/userRecord/user-record.entity";
import { getRepository, In, ObjectLiteral } from "typeorm";
import { Lbs } from "./entity/lb.entity";
import { LbsRepository } from "./lbs.repository";
@Injectable()
export class LbsService extends BaseCRUDService<Lbs> {
  constructor(private lbsRepository: LbsRepository) {
    super(lbsRepository);
  }

  /**
   * 量表类型
   * @returns
   */
  async findLbCategory(): Promise<Lbs[]> {
    let lbs = await this.find({ select: ["suitcrowd"] });
    lbs = lbs.map((v: { suitcrowd: any }) => v.suitcrowd);
    const category = new Set(lbs);
    return Array.from(category);
  }

  async findAll(
    where: any,
    pagination: PaginationArgs,
    orderBy: any
  ): Promise<any> {
    const lbs = await this.findAndPaginate(where, pagination, orderBy);
    lbs.edges = await resolveArrField(lbs.edges, [
      {
        selectId: "categoryIds",
        setfield: "category",
        selectEntityfield: "id",
        selectEntity: Category,
      },
    ]);
    return lbs;
  }

  /**
   * //进入量表详情 请求 (不需要家庭成员)
   *  user-item  我的道具 类型(永久量表  单次量表) + 10
   *   user-record 我的试卷 (最后一次是否完成)
   * @param id
   * @param currentUser
   * @returns
   */
  async findOneById(
    id: string,
    userId?: string,
    childrenId?: string
  ): Promise<any> {
    let lb = await this.findOne(id);
    if (!lb) {
      return [];
    }
    if (userId) {
      const whereRecord: any = { userId, lbid: id };
      const whereItem: any = { userId };
      if (childrenId) {
        whereRecord.childrenId = childrenId;
        // whereItem.childrenId = childrenId;
      }
      // 获取对应userReocde数据
      const userRecord = await getRepository(UserRecord).find({
        where: whereRecord,
      });
      // 获取对应userItem数据
      const userItem = await getRepository(UserItem).find({
        where: whereItem,
      });
      lb.userRecord = userRecord;
      lb.userItem = userItem;
    } else {
      lb.userRecord = [];
      lb.userItem = [];
    }
    if (lb) {
      lb = await resolveArrField(lb, [
        {
          selectId: "categoryIds",
          setfield: "category",
          selectEntityfield: "id",
          selectEntity: Category,
        },
      ]);
    }
    return lb;
  }
}
