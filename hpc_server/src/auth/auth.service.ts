import { Injectable, SetMetadata } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { User } from "src/user/userInfo/user.entity";
import { Passport } from "./interfaces/auth.interface";
import { JwtService } from "@nestjs/jwt";
import ms from "ms";
import { UsersService } from "src/user/userInfo/user.service";
import { sevCfg } from "src/config/sevCfg";

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UsersService
  ) {}

  // async signup(data: SignupInput): Promise<User> {
  //   return await this.userService.register(data);
  // }

  // async signin(data: SigninInput): Promise<Passport> {
  //   const user = await this.userService.verifyPassword(data);
  //   const passport = await this.generatePassport(user);
  //   return passport;
  // }

  /**
   * 构建令牌
   * @param user //玩家信息 (整个User)
   * @param openAuthData //平台信息 (openid openKey)
   * @returns
   */
  async generatePassport(user: User, openAuthData: any): Promise<Passport> {
    const payload = {
      userId: user.id,
      ...openAuthData,
    };
    const passport: Passport = {
      user: new User(),
      token: "",
      // refresh_token: "",
      // expired: 0,
    };

    //jwt配置
    const jwtCfg = sevCfg.get().jwt as any;

    //configService
    // jwtCfg.EXPIRES_IN ? jwtCfg.EXPIRES_IN : "3600s"
    passport.token = this.jwtService.sign(payload, {
      secret: jwtCfg.secret ? jwtCfg.secret : "SECRET",
      expiresIn: jwtCfg.EXPIRES_IN ? jwtCfg.EXPIRES_IN : "3600s",
    });
    // passport.refresh_token = this.jwtService.sign(payload, {
    //   secret: jwtCfg.REFRESH_SECRET ? jwtCfg.REFRESH_SECRET : "REFRESH_SECRET",
    //   expiresIn: jwtCfg.REFRESH_EXPIRES_IN
    //     ? jwtCfg.REFRESH_EXPIRES_IN
    //     : (7 * 24 * 3600).toString() + "s",
    // });
    passport.user = user;
    // const now = Date.parse(new Date().toISOString());
    // passport.expired = now + ms(jwtCfg.EXPIRES_IN);
    return passport;
  }

  async validateToken(token: string): Promise<{
    isValid: boolean;
    user?: User;
    isExpired?: boolean;
    token?: any;
  }> {
    // let userInfo = 解开token（）

    // if（userInfo == null）{
    //   //tolken 非法 或者2天后了 /踢下线
    // }else{
    //   //获得了
    //   userInfo
    //   if  (userInfo.otime > 1小时){
    //     //更新 token
    //   }
    // }

    try {
      const data = this.jwtService.verify(token, {
        secret: this.configService.get<string>("JWT_SECRET", "SECRET"),
      });
      const user = await this.userService.findOne({
        where: { id: data.userId },
      });
      // const user = await this.userLoader.load(sub);
      SetMetadata("jwt", data);
      return { user, isValid: true, token: data };
    } catch (e) {
      console.log("validateToken", e.toString());
      if (e.toString().indexOf("expired") != -1) {
        return { isValid: false, isExpired: true };
      }
      return { isValid: false };
    }
  }

  // async refreshToken(refreshToken: string): Promise<Passport | Error> {
  //   try {
  //     const decode = this.jwtService.verify(refreshToken, {
  //       secret: this.configService.get<string>(
  //         "JWT_REFRESH_SECRET",
  //         "REFRESH_SECRET"
  //       ),
  //     });
  //     const user = await this.userService.findOne({
  //       where: { id: decode.sub },
  //     });
  //     if (user) {
  //       return this.generatePassport(user);
  //     } else {
  //       throw new Error("无法找到refresh_token对应的用户");
  //     }
  //   } catch (error) {
  //     if (error.toString().indexOf("expired") != -1) {
  //       throw new Error("refresh_token expired");
  //     }
  //     throw new Error("refresh_token invalid");
  //   }
  // }
}
