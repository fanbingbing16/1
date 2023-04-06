import { Injectable } from "@nestjs/common";
import { PaginationArgs } from "src/common/paginate/connection-paging";
import { BaseCRUDService } from "src/common/service/crud/base.service";
import { resolveField } from "src/common/utils/utils";
import { Product } from "src/sys/product/product.entity";
import { getRepository } from "typeorm";
import { CreateUserItemDto } from "./dto/create-user-item.dto";
import { UserItem } from "./user-item.entity";
import { UserItemRepository } from "./user-item.repository";

@Injectable()
export class UserItemsService extends BaseCRUDService<UserItem> {
  constructor(private userItemRepository: UserItemRepository) {
    super(userItemRepository);
  }
  /**
   *  查询所有用户道具
   * @param where
   * @param pagination
   * @param orderBy
   */
  async findAll(
    where: any,
    pagination: PaginationArgs,
    orderBy: any
  ): Promise<any> {
    const userItems = await this.findAndPaginate(where, pagination, orderBy);
    userItems.edges = await resolveField(userItems.edges, [
      {
        selectId: "productId",
        setfield: "item",
        selectEntityfield: "id",
        selectEntity: Product,
      },
    ]);
    return userItems;
  }

  async findOneById(id: string): Promise<any> {
    let userItem = await this.findById(id);
    if (userItem) {
      userItem = await resolveField(userItem, [
        {
          selectId: "productId",
          setfield: "item",
          selectEntityfield: "id",
          selectEntity: Product,
        },
      ]);
    }
    return userItem;
  }

  /**
   * 新增道具数量
   * @param userItemId 用户道具id
   * @param addCount 新增数量
   */
  async addUserItemCount(
    userItemId: string,
    addCount: number
  ): Promise<boolean> {
    const userItem = await this.userItemRepository.findOne(userItemId);
    if (userItem) {
      if (addCount > 0) {
        userItem.count += addCount;
        await this.userItemRepository.save(userItem);
        return true;
      } else {
        throw new Error("商品数量异常");
      }
    } else {
      throw new Error("无此道具");
    }
  }

  /**
   * 减道具数量
   * @param userItemId 用户道具id
   * @param reduceCount 消耗数量
   */
  async reduceUserItemCount(
    userItemId: string,
    reduceCount: number
  ): Promise<boolean> {
    const userItem = await this.userItemRepository.findOne(userItemId);
    if (userItem) {
      if (reduceCount > 0) {
        userItem.count -= reduceCount;
        await this.userItemRepository.save(userItem);
        return true;
      } else {
        throw new Error("商品数量异常");
      }
    } else {
      throw new Error("无此道具");
    }
  }

  /**
   * 返回指定道具数量
   * @param userItemId 用户道具id
   * @returns 数量
   */
  async getUserItemCount(userItemId: string): Promise<number> {
    const userItem = await this.userItemRepository.findOne(userItemId, {
      select: ["count"],
    });
    if (userItem) {
      return userItem.count;
    } else {
      throw new Error("无此道具");
    }
  }

  /**
   * 创建用户道具
   * @param userItem
   * @returns
   */
  async createUserItem(userItem: UserItem): Promise<boolean> {
    const item =
      (await this.repository.findOne({
        productId: userItem.productId,
        userId: userItem.userId,
      })) || userItem;
    item.count = item ? (item.count || 0) + 1 : 1;
    await this.repository.save(item);
    return true;
  }
}
