import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { UsersModule } from "src/user/userInfo/user.module"; 
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  imports: [JwtModule, UsersModule],
  providers: [
    AuthService,
    {
      provide: "AUTH_SERVICE",
      useClass: AuthService,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService, "AUTH_SERVICE"],
})
export class AuthModule {}
