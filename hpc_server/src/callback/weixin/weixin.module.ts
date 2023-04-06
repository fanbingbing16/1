import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { UsersModule } from "src/user/userInfo/user.module";
import { WeixinController } from "./weixin.controller";
import { WeixinService } from "./weixin.service";

@Module({
  imports: [],
  providers: [WeixinService],
  controllers: [WeixinController],
  exports: [WeixinService],
})
export class WeixinModule {}
