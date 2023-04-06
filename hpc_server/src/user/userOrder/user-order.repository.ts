import { EntityRepository, Repository } from "typeorm";
import { UserOrder } from "./user-order.entity";

@EntityRepository(UserOrder)
export class UserOrderRepository extends Repository<UserOrder> {}
