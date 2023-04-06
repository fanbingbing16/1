import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { UserItemsModule } from "../userItem/user-item.module";
import { UserOrdersController } from "./user-order.controller";
import { UserOrderRepository } from "./user-order.repository";
import { UserOrdersService } from "./user-order.service";

@Module({
  imports: [
    UserItemsModule,
    TypeOrmModule.forFeature([UserOrderRepository]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserOrdersController],
  providers: [UserOrdersService],
  exports: [UserOrdersService],
})
export class UserOrdersModule {}
