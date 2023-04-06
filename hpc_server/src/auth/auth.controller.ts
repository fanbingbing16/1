import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Req,
  Res,
  HttpStatus,
  UseGuards,
  Inject,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Request, Response } from "express";
import * as dayjs from "dayjs";

import { AuthService } from "./auth.service"; 
import { CurrentUser } from "src/common/decorators/http/current-user.decorator"; 
import { SendCaptchaInput } from "./dto/send-captcha.input";
import { ApiCreatedResponse, ApiOperation, ApiTags } from "@nestjs/swagger"; 
import { User } from "src/user/userInfo/user.entity";

@ApiTags("工具部分")
@Controller({ path: "/auth" })
export class AuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService
  ) {}

  @Post("refresh")
  @ApiOperation({ summary: "刷新token" }) 
  // @ApiCreatedResponse({
  //   description: 'The record has been successfully created.',
  //   type: User,
  // })
  async refresh(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.headers["refresh_token"] as string;
    if (refreshToken) {
      try {
        // const passport = await this.authService.refreshToken(refreshToken);
        // return res.send(passport);
      } catch (error) {
        return res.status(HttpStatus.UNAUTHORIZED).send(error.toString());
      }
    }
    res.status(HttpStatus.UNAUTHORIZED).send("refresh_token not existed");
  }

  // 发送验证码
  @Post("auth/sendMobileCaptcha")
  @ApiOperation({ summary: "发送验证码" })
  async sendMobileCaptcha(@Body() data: SendCaptchaInput) {
    try {
      if (data == null || data.mobile == null || data.mobile.length <= 10) {
        return false;
      }
      // return await this.authService.sendMobileCaptcha(data.mobile);
    } catch (error) {
      return {
        msg: error.toString(),
      };
    }
  }

  // // 微信登录手机号激活注册
  // @Post("auth/wechatSignup")
  // @ApiOperation({ summary: "发送验证码" })
  // async wechatSignup(@Body() data: WechatSignupInput) {
  //   try {
  //     // const passport = await this.authService.wechatSignup(data);
  //     // return {
  //     //   token: passport,
  //     //   msg: "ok",
  //     // };
  //   } catch (error) {
  //     return {
  //       msg: error.toString(),
  //     };
  //   }
  // }

  // 获取系统管理后台配置
  @Get("admin/initial")
  async getAdminMenus(@CurrentUser() currentUser: User) {
    const res: any = {
      app: {
        name: "SaaS管理后台",
        description: "厦门楠翊技术有限公司",
      },
      user: currentUser,
    };
    return res;
  }

  @Get("user/initial")
  async getDoctorMenus(@CurrentUser() currentUser: User) {
    const res: any = {
      app: {
        name: "量表系统",
        description: "厦门楠翊技术有限公司",
      },
      user: currentUser,
    };
    return res;
  }

  // 获取系统管理后台配置
  @Get("tenant/initial")
  async getTenantMenus(@CurrentUser() currentUser: User) {
    // 先获取用户绑定的租户列表,并设置默认选择租户
    const res: any = {
      app: {
        name: "SaaS管理后台",
        description: "厦门触娱信息技术有限公司",
      },
      user: {
        id: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.hand,
        email: currentUser.mobile,
      },
      // tenants: await this.tenantService.getUserTenants(currentUser.id),
    };
    return res;
  }
}
