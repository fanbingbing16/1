import { Injectable } from "@nestjs/common";
import { PaginationArgs } from "src/common/paginate/connection-paging";
import { BaseCRUDService } from "src/common/service/crud/base.service";
import { resolveField, sumArr } from "src/common/utils/utils";
import { LbAdv } from "src/lb/lb-adv/entity/lb-adv.entity";
import { LbGs } from "src/lb/lb-gs/entity/lb-gs.entity";
import { Lbs } from "src/lb/lb-info/entity/lb.entity";
import { LbXx } from "src/lb/lb-xx/entity/lb-xx.entity";
import { Product } from "src/sys/product/product.entity";
import { getRepository } from "typeorm";
import { UserChildren } from "../userChildren/user-children.entity";
import { User } from "../userInfo/user.entity";
import { UserItem } from "../userItem/user-item.entity";
import { UserItemsService } from "../userItem/user-item.service";
import { CreateUserRecordDto, UpdateUserRecordDto } from "./dto";
import { CollecReport, collectJson } from "./interfaces/user-record.interface";
import { RecordStatus } from "./user-record.enmu";
import { UserRecord } from "./user-record.entity";
import { UserRecordRepository } from "./user-record.repository";

@Injectable()
export class UserRecordsService extends BaseCRUDService<UserRecord> {
  constructor(
    private userRecordRepository: UserRecordRepository,
    private userItemService: UserItemsService
  ) {
    super(userRecordRepository);
  }

  /**
   * 新建做题量表
   * @param createUserRecordDto
   * @param currentUser
   * @returns
   */
  async createUserRecord(
    createUserRecordDto: CreateUserRecordDto,
    currentUser: User
  ): Promise<UserRecord> {
    await this.hasChildren(currentUser.id, createUserRecordDto.childrenId);
    //  查询用户是否购买量表
    const { productId } = createUserRecordDto;
    const hasItem = await getRepository(UserItem).findOne({ productId });
    // .createQueryBuilder("userItem")
    // .innerJoin("userItem.product", "product")
    // .where({
    //   userId: currentUser.id,
    //   productId,
    // })
    // .andWhere("product.id = :productId", {
    //   productId,
    // })
    // .getOne();

    if ((!hasItem || hasItem.count == 0) && hasItem?.product.kind != 1) {
      throw new Error("请先购买此测评，再进行测评");
    }
    const product = await getRepository(Product).findOne(productId);
    this.userItemService.reduceUserItemCount(hasItem.id, 1);
    const userRecord = new UserRecord();
    userRecord.userId = currentUser.id;
    userRecord.productId = productId;
    userRecord.lbid = product ? product.itemId : "";
    return await this.userRecordRepository.save(
      Object.assign(userRecord, createUserRecordDto)
    );
  }

  /**
   * 提交量表
   * @param updateUserRecordDto
   * @returns
   */
  async submitUserRecord(
    updateUserRecordDto: UpdateUserRecordDto
  ): Promise<boolean> {
    const userRecord = new UserRecord();
    userRecord.status = RecordStatus.SUCCESS;
    await this.userRecordRepository.save(
      Object.assign(userRecord, updateUserRecordDto)
    );
    return true;
  }

  /**
   * 暂存记录
   * @param updateUserRecordDto
   * @returns
   */
  async stagingUserRecord(
    updateUserRecordDto: UpdateUserRecordDto
  ): Promise<boolean> {
    const userRecordDb = await this.userRecordRepository.findOne(
      updateUserRecordDto.id
    );
    if (!userRecordDb) {
      throw new Error("测评id 异常");
    }
    if (userRecordDb.status === RecordStatus.SUCCESS) {
      throw new Error("改测评已完成");
    }
    const userRecord = new UserRecord();
    userRecord.status = RecordStatus.STAGING;
    userRecord.collectReport = JSON.stringify(
      await this.generateReport(
        userRecordDb.lbid,
        updateUserRecordDto.collectJson
      )
    );
    await this.userRecordRepository.save(
      Object.assign(userRecord, updateUserRecordDto)
    );
    return true;
  }

  /**
   *  判断儿童是否存在
   * @param userId
   * @param childrenId
   * @returns
   */
  async hasChildren(userId: string, childrenId: string): Promise<boolean> {
    // 判断儿童是否存在
    const hasChildren = await getRepository(UserChildren).findOne({
      where: {
        userId,
        id: childrenId,
      },
    });
    if (hasChildren) {
      return true;
    } else {
      throw new Error("儿童信息错误");
    }
  }

  async generateReport(
    lbid: string,
    collectJson: collectJson
  ): Promise<CollecReport> {
    //
    let xxidArr: any = [];
    for (const key in collectJson.answer) {
      if (Object.prototype.hasOwnProperty.call(collectJson.answer, key)) {
        xxidArr = [...xxidArr, ...Object.values(collectJson.answer[key])];
      }
    }
    const xxDb = await getRepository(LbXx).findByIds(xxidArr, {
      select: ["score"],
    });
    const score = sumArr(xxDb.map((v) => Number(v.score)));
    const gs = await getRepository(LbGs).find({ where: { lbid } });
    const adv = await getRepository(LbAdv).find({ where: { lbid } });
    const collectReport: CollecReport = {};
    gs.forEach((v) => {
      if (score >= Number(v.sedge) && score <= Number(v.eedge)) {
        collectReport.gs += v.desc + "\n";
      }
    });
    collectReport.score = score;
    collectReport.adv = adv;
    return collectReport;
  }

  /**
   *  查询所有用户做题记录
   * @param where
   * @param pagination
   * @param orderBy
   */
  async findAll(
    where: any,
    pagination: PaginationArgs,
    orderBy: any
  ): Promise<any> {
    const userRecord = await this.findAndPaginate(where, pagination, orderBy);
    userRecord.edges = await resolveField(userRecord.edges, [
      {
        selectId: "lbid",
        setfield: "lb",
        selectEntityfield: "id",
        selectEntity: Lbs,
      },
    ]);
    return userRecord;
  }
}
