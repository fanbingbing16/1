import { Module } from "@nestjs/common";
import { UserRecordsModule } from "src/user/userRecord/user-record.module";
import { LocalController } from "./local.controller";
import { LocalService } from "./local.service";

@Module({
  imports: [UserRecordsModule],
  providers: [LocalService],
  controllers: [LocalController],
  exports: [LocalService],
})
export class LocalModule {}
