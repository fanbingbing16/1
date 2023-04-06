import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { Roles } from "../../common/decorators/roles.decorator";
import { RolesGuard } from "../../common/guards/roles.guard";
import { ParseIntPipe } from "../../common/pipes/parse-int.pipe";
import { GmLoginsService } from "./gm-login.service";
import { CreateGmLoginDto, UpdateGmLoginDto, WhereGmLoginDto } from "./dto";
import { Auth } from "src/common/decorators/http/auth.decorator";
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { ResultData } from "src/common/decorators/http/api-result.decorator";
import { PagingGmLoginArgs } from "./dto/paging-gm-login.args";
import { SignupDto } from "./dto";
import { SigninDto } from "./dto";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { handleListParams } from "src/common/utils/utils";

@UseGuards(RolesGuard)
@Controller("gmLogin")
@ApiTags("官方登录模块")
export class GmLoginsController {
  constructor(private readonly gmLoginService: GmLoginsService) {}

  @Post()
  @Roles("admin")
  @ApiOperation({ summary: "新建官方登录账号" })
  async create(
    @Body() createGmLoginDto: CreateGmLoginDto
  ): Promise<ResultData> {
    try {
      return ResultData.ok(
        await this.gmLoginService.createEntity(createGmLoginDto)
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
    @Query() pagingGmLoginArgs: PagingGmLoginArgs
  ): Promise<ResultData> {
    const { where, orderBy, pagination } = handleListParams(pagingGmLoginArgs);
    try {
      return ResultData.ok(
        await this.gmLoginService.findAndPaginate(where, pagination, orderBy)
      );
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Get("/findOne/:id")
  @Roles("admin")
  @Auth()
  @ApiOperation({ summary: "单条" })
  async findOne(@Param("id") id: string): Promise<ResultData> {
    try {
      return ResultData.ok(await this.gmLoginService.findById(id));
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Put()
  @Roles("admin")
  @Auth()
  @ApiOperation({ summary: "编辑" })
  async update(
    @Body() updateGmLoginDto: UpdateGmLoginDto
  ): Promise<ResultData> {
    try {
      const { id, ...data } = updateGmLoginDto;
      return ResultData.ok(await this.gmLoginService.updateEntity(id, data));
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
      return ResultData.ok(await this.gmLoginService.destroyOne(id));
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  // 注册新用户
  @ApiOperation({ summary: "注册" })
  @Post("signup")
  async signup(@Body() data: SignupDto): Promise<ResultData> {
    try {
      return ResultData.ok(await this.gmLoginService.register(data));
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @ApiOperation({ summary: "登录" })
  @Post("signin")
  async signin(@Body() data: SigninDto): Promise<ResultData> {
    try {
      return ResultData.ok(await this.gmLoginService.verifyPassword(data));
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }
  
  @ApiOperation({ summary: "修改密码" })
  @Auth()
  @Put("changePassword")
  async changePassword(@Body() data: ChangePasswordDto): Promise<ResultData> {
    try {
      return ResultData.ok(await this.gmLoginService.changePassword(data));
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }
}
