import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { AuthService } from "src/auth/auth.service";
import { UserItemsModule } from "../userItem/user-item.module";
import { UserRecordsController } from "./user-record.controller";
import { UserRecordRepository } from "./user-record.repository";
import { UserRecordsService } from "./user-record.service";

@Module({
  imports: [
    UserItemsModule,
    TypeOrmModule.forFeature([UserRecordRepository]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserRecordsController],
  providers: [UserRecordsService],
  exports: [UserRecordsService],
})
export class UserRecordsModule {}
