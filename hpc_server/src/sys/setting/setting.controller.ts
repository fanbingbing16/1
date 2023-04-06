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
import { SettingsService } from "./setting.service";
import { CreateSettingDto, UpdateSettingDto, WhereSettingDto } from "./dto";
import { Auth } from "src/common/decorators/http/auth.decorator";
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { ResultData } from "src/common/decorators/http/api-result.decorator";
import { PagingSettingArgs } from "./dto/paging-setting.args";
import { handleListParams } from "src/common/utils/utils";

@UseGuards(RolesGuard)
@Controller("setting")
@Auth()
@ApiBearerAuth("Authorization")
@ApiTags("后台配置 时常需要改变的配置")
export class SettingsController {
  constructor(private readonly settingService: SettingsService) {}

  @Post()
  @Roles("admin")
  @ApiOperation({ summary: "新建" })
  async create(
    @Body() createSettingDto: CreateSettingDto
  ): Promise<ResultData> {
    try {
      return ResultData.ok(
        await this.settingService.createEntity(createSettingDto)
      );
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Get()
  @ApiOperation({ summary: "列表" })
  async findAll(
    @Query() pagingSettingArgs: PagingSettingArgs
  ): Promise<ResultData> {
    const { where, orderBy, pagination } = handleListParams(pagingSettingArgs);
    try {
      return ResultData.ok(
        await this.settingService.findAndPaginate(where, pagination, orderBy)
      );
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Get("/findOne/:id")
  @ApiOperation({ summary: "单条" })
  async findOne(@Param("id") id: string): Promise<ResultData> {
    try {
      return ResultData.ok(await this.settingService.findById(id));
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Put()
  @Roles("admin")
  @ApiOperation({ summary: "编辑" })
  async update(
    @Body() updateSettingDto: UpdateSettingDto
  ): Promise<ResultData> {
    try {
      const { id, ...data } = updateSettingDto;
      return ResultData.ok(await this.settingService.updateEntity(id, data));
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Delete("/:id")
  @Roles("admin")
  @ApiOperation({ summary: "删除" })
  async remove(@Param("id") id: string): Promise<ResultData> {
    try {
      return ResultData.ok(await this.settingService.destroyOne(id));
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }
}
