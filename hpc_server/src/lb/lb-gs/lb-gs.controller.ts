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
import { LbGsService } from "./lb-gs.service";
import { Auth } from "src/common/decorators/http/auth.decorator";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ResultData } from "src/common/decorators/http/api-result.decorator";
import { PagingLbGsArgs } from "./dto/paging-lb-gs.args";
import { handleListParams } from "src/common/utils/utils";
import { CreateLbGsDto } from "./dto/create-lb-gs.dto";
import { UpdateLbGsDto } from "./dto/update-lb-gs.dto";

@Controller("lbGs")
@Auth()
@ApiBearerAuth("Authorization")
@ApiTags("量表Gs模块")
export class LbGsController {
  constructor(private readonly lbGsService: LbGsService) {}

  @Post()
  @ApiOperation({ summary: "新建" })
  async create(@Body() createLbGsDto: CreateLbGsDto): Promise<ResultData> {
    try {
      return ResultData.ok(await this.lbGsService.createEntity(createLbGsDto));
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Get()
  @ApiOperation({ summary: "列表" })
  async findAll(@Query() pagingLbGsArgs: PagingLbGsArgs): Promise<ResultData> {
    const { where, orderBy, pagination } = handleListParams(pagingLbGsArgs);
    try {
      return ResultData.ok(
        await this.lbGsService.findAndPaginate(where, pagination, orderBy)
      );
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Get("/findOne/:id")
  @ApiOperation({ summary: "单条" })
  async findOne(@Param("id") id: string): Promise<ResultData> {
    try {
      return ResultData.ok(await this.lbGsService.findById(id));
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Put()
  @ApiOperation({ summary: "编辑" })
  async update(@Body() updateLbGsDto: UpdateLbGsDto): Promise<ResultData> {
    try {
      const { id, ...data } = updateLbGsDto;
      return ResultData.ok(await this.lbGsService.updateEntity(id, data));
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Delete("/:id")
  @ApiOperation({ summary: "删除" })
  async remove(@Param("id") id: string): Promise<ResultData> {
    try {
      return ResultData.ok(await this.lbGsService.destroyOne(id));
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }
}
