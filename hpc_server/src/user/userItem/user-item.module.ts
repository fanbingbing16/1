import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { AuthService } from "src/auth/auth.service";
import { UserItemsController } from "./user-item.controller";
import { UserItemRepository } from "./user-item.repository";
import { UserItemsService } from "./user-item.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserItemRepository]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserItemsController],
  providers: [UserItemsService],
  exports: [UserItemsService],
})
export class UserItemsModule {}
