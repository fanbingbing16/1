import { Injectable } from "@nestjs/common";
import { BaseCRUDService } from "src/common/service/crud/base.service";
import { generateFlakeID } from "src/common/utils/flake";
import { Lbs } from "src/lb/lb-info/entity/lb.entity";
import { Product } from "src/sys/product/product.entity";
import { getRepository } from "typeorm";
import { User } from "../userInfo/user.entity";
import { UserItem } from "../userItem/user-item.entity";
import { UserItemsService } from "../userItem/user-item.service";
import { UserRecord } from "../userRecord/user-record.entity";
import { CreateUserOrderDto } from "./dto";
import { PaymenStatus } from "./user-order.enmu";
import { UserOrder } from "./user-order.entity";
import { UserOrderRepository } from "./user-order.repository";

@Injectable()
export class UserOrdersService extends BaseCRUDService<UserOrder> {
  constructor(
    private userOrderRepository: UserOrderRepository,
    private userItemService: UserItemsService
  ) {
    super(userOrderRepository);
  }

  /**
   *  购买商品
   * @param createUserOrderDto
   * @param currentUser
   * @returns
   */
  async createUserOrder(
    createUserOrderDto: CreateUserOrderDto,
    currentUser: User
  ): Promise<any> {
    // 判断量表是否存在
    const { params, count, sdkId } = createUserOrderDto;
    const { productId } = params;
    const productInfo = await getRepository(Product).findOne(productId);
    if (!productInfo || count < 0) {
      throw new Error("请选择正确商品和数量购买");
    }
    // // 查询用户是否存在此道具
    // const hasUserItem = await getRepository(UserItem).findOne({
    //   where: {
    //     userId: currentUser.id,
    //     productId,
    //   },
    // });
    // // 创建用户道具
    // if (hasUserItem) {
    //   throw new Error("已购买此商品");
    // }

    let userOrder = new UserOrder();
    userOrder.userId = currentUser.id;
    userOrder.sdkId = sdkId;
    if (productInfo.price == 0) {
      // 免费
      userOrder.status = PaymenStatus.SUCCESS;
      const userItem = new UserItem();
      userItem.productId = productId;
      userItem.userId = currentUser.id;
      await this.userItemService.createUserItem(userItem);
    } else {
      // 保存订单
      userOrder.status = PaymenStatus.PENGDING;
      userOrder = await this.userOrderRepository.save(
        Object.assign(userOrder, createUserOrderDto)
      );
    }
    return userOrder;
  }

  /**
   *  完成订单，并下发道具
   * @param createUserItemDto
   */
  async createUserItem(cpOrderId: string): Promise<UserItem> {
    const { product, userOrder } = await this.orderToUserItem(cpOrderId);
    const userItem = new UserItem();
    userItem.userId = userOrder.userId;
    userItem.productId = product.id;
    userItem.count = userOrder.count || 1;
    return await getRepository(UserItem).save(userItem);
  }

  /**
   * 封装 订单转换为道具
   * @param userOrderId
   * @returns
   */
  async orderToUserItem(
    cpOrderId: string
  ): Promise<{ product: Product; userOrder: UserOrder }> {
    const userOrder = await this.userOrderRepository.findOne({
      where: { cpOrderId },
    });
    if (userOrder) {
      const params = JSON.parse(userOrder?.params);
      const product = await getRepository(Product).findOne(params.productId);
      if (!product) {
        throw new Error("未查到订单商品");
      } else {
        return { product, userOrder };
      }
    } else {
      throw new Error("未查到订单");
    }
  }
}
