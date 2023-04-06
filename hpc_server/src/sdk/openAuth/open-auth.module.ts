import { CacheModule, forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { AuthService } from "src/auth/auth.service";
import { GmLoginsModule } from "../gmLogin/gm-login.module";
import { GmLoginsService } from "../gmLogin/gm-login.service";
import { OpenAuthController } from "./open-auth.controller";
import { OpenAuthRepository } from "./open-auth.repository";
import { OpenAuthService } from "./open-auth.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([OpenAuthRepository]),
    CacheModule.register({
      isGlobal: true,
    }),
    AuthModule,
    GmLoginsModule,
    // GmLoginsService,
  ],
  controllers: [OpenAuthController],
  providers: [OpenAuthService],
  exports: [OpenAuthService],
})
export class OpenAuthModule {}
