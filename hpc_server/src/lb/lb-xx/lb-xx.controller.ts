import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { LbXxService } from "./lb-xx.service";
import { Auth } from "src/common/decorators/http/auth.decorator";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ResultData } from "src/common/decorators/http/api-result.decorator";
import { PagingLbXxArgs } from "./dto/paging-lb-xx.args";
import { handleListParams } from "src/common/utils/utils";
import { CreateLbXxDto } from "./dto/create-lb-xx.dto";
import { UpdateLbXxDto } from "./dto/update-lb-xx.dto";

@Controller("lbXx")
@Auth()
@ApiBearerAuth("Authorization")
@ApiTags("量表选项模块")
export class LbXxController {
  constructor(private readonly lbXxService: LbXxService) {}

  @Post()
  @ApiOperation({ summary: "新建" })
  async create(@Body() createLbXxDto: CreateLbXxDto): Promise<ResultData> {
    try {
      return ResultData.ok(await this.lbXxService.createEntity(createLbXxDto));
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Get()
  @ApiOperation({ summary: "列表" })
  async findAll(@Query() pagingLbXxArgs: PagingLbXxArgs): Promise<ResultData> {
    const { where, orderBy, pagination } = handleListParams(pagingLbXxArgs);
    try {
      return ResultData.ok(
        await this.lbXxService.findAndPaginate(where, pagination, orderBy)
      );
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Get("/findOne/:id")
  @ApiOperation({ summary: "单条" })
  async findOne(@Param("id") id: string): Promise<ResultData> {
    try {
      return ResultData.ok(await this.lbXxService.findById(id));
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Put()
  @ApiOperation({ summary: "编辑" })
  async update(@Body() updateLbXxDto: UpdateLbXxDto): Promise<ResultData> {
    try {
      const { id, ...data } = updateLbXxDto;
      return ResultData.ok(await this.lbXxService.updateEntity(id, data));
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Delete("/:id")
  @ApiOperation({ summary: "删除" })
  async remove(@Param("id") id: string): Promise<ResultData> {
    try {
      return ResultData.ok(await this.lbXxService.destroyOne(id));
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }
}
