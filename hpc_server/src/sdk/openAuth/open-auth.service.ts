import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { BaseCRUDService } from "src/common/service/crud/base.service";
import { OpenAuthRepository } from "./open-auth.repository";
import { OpenAuth } from "./entity/open-auth.entity";
import { LoginOpenAuthDto } from "./dto/login-open-auth.dto";
import { get, post } from "src/common/utils/request";
import { allCfg } from "src/config/allCfg";
import { Cache } from "cache-manager";
import { accessWxInfo, wxLoginInfo } from "./interfaces/open-auth.interface";
import { getRepository } from "typeorm";
import { AuthService } from "src/auth/auth.service";
import { GmLoginsService } from "../gmLogin/gm-login.service";
import { Passport } from "src/auth/interfaces/auth.interface";
import { User } from "src/user/userInfo/user.entity";
import * as dayjs from "dayjs";

@Injectable()
export class OpenAuthService extends BaseCRUDService<OpenAuth> {
  accessTokenInfo: any;
  constructor(
    private openAuthRepository: OpenAuthRepository,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly authService: AuthService,
    private readonly gmLoginService: GmLoginsService
  ) {
    super(openAuthRepository);
  }

  /**
   * 微信登录获取openid
   * @param loginOpenAuthDto
   * @returns
   */
  async wxMiniProgramLogin(
    loginOpenAuthDto: LoginOpenAuthDto
  ): Promise<Passport> {
    //平台登录验证
    const sdkInfo = allCfg.sdk.info[loginOpenAuthDto.sdkid];
    const appid = sdkInfo.param.appid; // 获取对应sdk的appid
    const secret = sdkInfo.secret.AesKey; // 获取对应sdk的secret
    const openPram_str = await get(
      `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${loginOpenAuthDto.params[0]}&grant_type=authorization_code`
    );
    const openPram = JSON.parse(openPram_str);
    if (!openPram.openid) {
      throw new Error("小程序登录验证失败:" + openPram_str);
    }

    //平台登录完成 获得 userInfo.openid

    //吧 openId 保存 生成 user // 由于 user的生成依赖user表 所以这时候 需要去吧user 表先生成
    // 吧 openId 生成 user 打包在一起 openId  和 user 一起生成 先user 再 open表
    //打包为 根据 open信息(userInfo) 生成 user 并返回 user
    // 然后本方法就有了 open信息 + user 信息 去构建令牌

    // get User By   OpenPram

    //TODO 改动点  吧 变量名 userInfo 改为 openPram
    // 吧 openPram 生成 user 打包起来

    let openAuth = await this.openAuthRepository.findOne({
      where: { openid: openPram.openid },
    });
    let userResult: User = new User();
    if (openAuth) {
      userResult =
        (await getRepository(User).findOne({
          where: { id: openAuth.userId },
        })) || new User();
    } else {
      // 验证是否已登录openAuth
      //   if (!openAuth.userId) {
      //     const userResult = await getRepository(User).save(user);
      //     openAuth.userId = userResult.id;
      //   }
      //   openAuth.tokens = JSON.parse(JSON.stringify(userInfo));
      // } else {
      const user = new User();
      openAuth = new OpenAuth();
      openAuth.openid = openPram.openid;
      openAuth.sdkId = loginOpenAuthDto.sdkid;
      userResult = await getRepository(User).save(user);
      openAuth.userId = userResult.id;
    }
    openAuth.tokens = JSON.parse(JSON.stringify(openPram));
    openAuth = await this.openAuthRepository.save(openAuth);
    return await this.authService.generatePassport(userResult, {
      openAuthId: openAuth.id,
    });
  }

  /**
   * 官方登录
   * @param loginOpenAuthDto
   * @returns
   */
  async gmOpenAuthLogin(loginOpenAuthDto: LoginOpenAuthDto): Promise<Passport> {
    const params = loginOpenAuthDto.params;
    const gmLogin = await this.gmLoginService.findOne({
      where: { openid: params[0] },
    });
    if (gmLogin?.openkey == params[1]) {
      let openAuth = await this.openAuthRepository.findOne({
        where: { openid: params[0] },
      });
      let userResult: User = new User();
      if (openAuth) {
        userResult =
          (await getRepository(User).findOne({
            where: { id: openAuth.userId },
          })) || new User();
      } else {
        const user = new User();
        openAuth = new OpenAuth();
        openAuth.openid = params[0];
        openAuth.sdkId = loginOpenAuthDto.sdkid;
        openAuth.tokens = JSON.parse(
          JSON.stringify({ openid: params[0], openkey: params[1] })
        );
        userResult = await getRepository(User).save(user);
        openAuth.userId = userResult.id;
        openAuth = await this.openAuthRepository.save(openAuth);
      }
      return await this.authService.generatePassport(userResult, {
        openAuthId: openAuth.id,
      });
    } else {
      throw new Error("请使用正确的openkey");
    }
  }

  /**
   * 获取acceessToken
   * @param appid
   * @param secret
   * @returns
   */
  async getWxAccessToken(appid: string, secret: string): Promise<accessWxInfo> {
    // const value = await this.cacheManager.get("access_wx_Info");
    if (
      this.accessTokenInfo?.expires_time &&
      dayjs(new Date()).isBefore(this.accessTokenInfo?.expires_time)
    ) {
      return this.accessTokenInfo;
    }
    const accessInfo = await get(
      `https://api.weixin.qq.com/cgi-bin/token?appid=${appid}&secret=${secret}&grant_type=client_credential`
    );
    // await this.cacheManager.set(
    //   "access_wx_Info",
    //   accessInfo,
    //   accessInfo.expires_in
    // );

    this.accessTokenInfo = {
      ...JSON.parse(accessInfo),
      expires_time: dayjs().add(2, "hours").format("YYYY-MM-DD HH:mm:ss"),
    };
    return this.accessTokenInfo;
  }

  async getWxMiniProPhone(code: string, currentUser: User) {
    const sdkInfo = allCfg.sdk.info["2"];
    const appid = sdkInfo.param.appid; // 获取对应sdk的appid
    const secret = sdkInfo.secret.AesKey; // 获取对应sdk的secret
    const { access_token } = await this.getWxAccessToken(appid, secret);
    const userPhone = await post(
      `https://api.weixin.qq.com/wxa/business/getuserphonenumber?access_token=${access_token}`,
      {
        json: {
          code,
        },
      }
    );
    const openAuth = await this.openAuthRepository.findOne({
      where: { userId: currentUser.id },
    });
    if (!openAuth) {
      throw new Error("请先授权注册");
    }
    if (!openAuth.phone) {
      openAuth.phone = userPhone.phone_info.phoneNumber;
      await this.openAuthRepository.save(openAuth);
      await getRepository(User).update(currentUser.id, {
        mobile: openAuth.phone,
      });
    }
    return userPhone.phone_info.phoneNumber;
  }
}
