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
import { LbAdvService } from "./lb-adv.service";
import { Auth } from "src/common/decorators/http/auth.decorator";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ResultData } from "src/common/decorators/http/api-result.decorator";
import { PagingLbAdvArgs } from "./dto/paging-lb-adv.args";
import { handleListParams } from "src/common/utils/utils";
import { CreateLbAdvDto } from "./dto/create-lb-adv.dto";
import { UpdateLbAdvDto } from "./dto/update-lb-adv.dto";

@Controller("lbAdv")
@Auth()
@ApiBearerAuth("Authorization")
@ApiTags("量表指导建议模块")
export class LbAdvController {
  constructor(private readonly lbAdvService: LbAdvService) {}

  @Post()
  @ApiOperation({ summary: "新建" })
  async create(@Body() createLbAdvDto: CreateLbAdvDto): Promise<ResultData> {
    try {
      return ResultData.ok(
        await this.lbAdvService.createEntity(createLbAdvDto)
      );
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Get()
  @ApiOperation({ summary: "列表" })
  async findAll(
    @Query() pagingLbAdvArgs: PagingLbAdvArgs
  ): Promise<ResultData> {
    const { where, orderBy, pagination } = handleListParams(pagingLbAdvArgs);
    try {
      return ResultData.ok(
        await this.lbAdvService.findAndPaginate(where, pagination, orderBy)
      );
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Get("/findOne/:id")
  @ApiOperation({ summary: "单条" })
  async findOne(@Param("id") id: string): Promise<ResultData> {
    try {
      return ResultData.ok(await this.lbAdvService.findById(id));
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Put()
  @ApiOperation({ summary: "编辑" })
  async update(@Body() updateLbAdvDto: UpdateLbAdvDto): Promise<ResultData> {
    try {
      const { id, ...data } = updateLbAdvDto;
      return ResultData.ok(await this.lbAdvService.updateEntity(id, data));
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Delete("/:id")
  @ApiOperation({ summary: "删除" })
  async remove(@Param("id") id: string): Promise<ResultData> {
    try {
      return ResultData.ok(await this.lbAdvService.destroyOne(id));
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }
}
