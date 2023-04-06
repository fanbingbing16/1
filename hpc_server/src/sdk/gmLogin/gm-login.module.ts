import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { GmLoginsController } from "./gm-login.controller";
import { GmLoginRepository } from "./gm-login.repository";
import { GmLoginsService } from "./gm-login.service";

//模块打包 给外部调用
@Module({
  imports: [
    TypeOrmModule.forFeature([GmLoginRepository]),
    // forwardRef(() => AuthModule),
    AuthModule
  ],
  controllers: [GmLoginsController],
  providers: [GmLoginsService],
  exports: [GmLoginsService],
})
export class GmLoginsModule {}
