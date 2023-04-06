import {
  Body,
  CacheKey,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { OpenAuthService } from "./open-auth.service";
import { CreateOpenAuthDto, UpdateOpenAuthDto } from "./dto";
import { Auth } from "src/common/decorators/http/auth.decorator";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ResultData } from "src/common/decorators/http/api-result.decorator";
import { PagingOpenAuthArgs } from "./dto/paging-open-auth.args";
import { handleListParams } from "src/common/utils/utils";
import { Roles } from "src/common/decorators/roles.decorator";
import { RolesGuard } from "src/common/guards/roles.guard";
import { LoginOpenAuthDto } from "./dto/login-open-auth.dto";
import { Passport } from "src/auth/interfaces/auth.interface";
import { CurrentUser } from "src/common/decorators/http/current-user.decorator";
import { User } from "src/user/userInfo/user.entity";
import { allCfg, Ptype } from "src/config/allCfg";

@Controller("openAuth")
@UseGuards(RolesGuard)
@ApiBearerAuth("Authorization")
@ApiTags("第三方登录平台模块")
export class OpenAuthController {
  constructor(private readonly openAuthService: OpenAuthService) {}

  @Post()
  @Roles("admin")
  @Auth()
  @ApiOperation({ summary: "新建" })
  async create(
    @Body() createOpenAuthDto: CreateOpenAuthDto
  ): Promise<ResultData> {
    try {
      return ResultData.ok(
        await this.openAuthService.createEntity(createOpenAuthDto)
      );
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Get()
  @Roles("admin")
  @Auth()
  @ApiOperation({ summary: "列表" })
  async findAll(
    @Query() pagingOpenAuthArgs: PagingOpenAuthArgs
  ): Promise<ResultData> {
    const { where, orderBy, pagination } = handleListParams(pagingOpenAuthArgs);
    try {
      return ResultData.ok(
        await this.openAuthService.findAndPaginate(where, pagination, orderBy)
      );
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Get("/findOne/:id")
  @Auth()
  @ApiOperation({ summary: "单条" })
  async findOne(@Param("id") id: string): Promise<ResultData> {
    try {
      return ResultData.ok(await this.openAuthService.findById(id));
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Put()
  @Roles("admin")
  @Auth()
  @ApiOperation({ summary: "编辑" })
  async update(
    @Body() updateOpenAuthDto: UpdateOpenAuthDto
  ): Promise<ResultData> {
    try {
      const { id, ...data } = updateOpenAuthDto;
      return ResultData.ok(await this.openAuthService.updateEntity(id, data));
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Delete("/:id")
  @Roles("admin")
  @Auth()
  @ApiOperation({ summary: "删除" })
  async remove(@Param("id") id: string): Promise<ResultData> {
    try {
      return ResultData.ok(await this.openAuthService.destroyOne(id));
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Post("openAuthLogin")
  @ApiOperation({ summary: "第三方登录" })
  async openAuthLogin(
    @Body() loginOpenAuthDto: LoginOpenAuthDto
  ): Promise<ResultData> {
    const sdkInfo = allCfg.sdk.info[loginOpenAuthDto.sdkid];
    if (!sdkInfo) {
      throw new Error("请输入正确的sdkid");
    }

    let data: Passport;
    try {
      switch (sdkInfo.ptype) {
        case Ptype.gm:
          data = await this.openAuthService.gmOpenAuthLogin(loginOpenAuthDto);
          break;
        case Ptype.weixin:
          data = await this.openAuthService.wxMiniProgramLogin(
            loginOpenAuthDto
          );
          break;
        default:
          throw new Error("请输入正确的sdkid");
      }
      return ResultData.ok(data);
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Get("/getWxMiniProPhone/:code")
  @Auth()
  @ApiOperation({ summary: "微信小程序获取手机号" })
  async getWxMiniProPhone(
    @Param("code") code: string,
    @CurrentUser() currentUser: User
  ): Promise<ResultData> {
    try {
      return ResultData.ok(
        await this.openAuthService.getWxMiniProPhone(code, currentUser)
      );
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Post("/getAccessToken")
  @Auth()
  @ApiOperation({ summary: "getAccessToken" })
  async getAccessToken(): Promise<ResultData> {
    try {
      const sdkInfo = allCfg.sdk.info["2"];
      const appid = sdkInfo.param.appid; // 获取对应sdk的appid
      const secret = sdkInfo.secret.AesKey; // 获取对应sdk的secret
      return ResultData.ok(
        await this.openAuthService.getWxAccessToken(appid, secret)
      );
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }
}
