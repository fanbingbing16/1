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
import { LbCommService } from "./lb-comm.service";
import { Auth } from "src/common/decorators/http/auth.decorator";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ResultData } from "src/common/decorators/http/api-result.decorator";
import { PagingLbCommArgs } from "./dto/paging-lb-comm.args";
import { handleListParams } from "src/common/utils/utils";
import { CreateLbCommDto } from "./dto/create-lb-comm.dto";
import { UpdateLbCommDto } from "./dto/update-lb-comm.dto";

@Controller("lbComm")
@Auth()
@ApiBearerAuth("Authorization")
@ApiTags("量表Comm模块")
export class LbCommController {
  constructor(private readonly lbCommService: LbCommService) {}

  @Post()
  @ApiOperation({ summary: "新建" })
  async create(@Body() createLbCommDto: CreateLbCommDto): Promise<ResultData> {
    try {
      return ResultData.ok(
        await this.lbCommService.createEntity(createLbCommDto)
      );
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Get()
  @ApiOperation({ summary: "列表" })
  async findAll(
    @Query() pagingLbCommArgs: PagingLbCommArgs
  ): Promise<ResultData> {
    const { where, orderBy, pagination } = handleListParams(pagingLbCommArgs);
    try {
      return ResultData.ok(
        await this.lbCommService.findAndPaginate(where, pagination, orderBy)
      );
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Get("/findOne/:id")
  @ApiOperation({ summary: "单条" })
  async findOne(@Param("id") id: string): Promise<ResultData> {
    try {
      return ResultData.ok(await this.lbCommService.findById(id));
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Put()
  @ApiOperation({ summary: "编辑" })
  async update(@Body() updateLbCommDto: UpdateLbCommDto): Promise<ResultData> {
    try {
      const { id, ...data } = updateLbCommDto;
      return ResultData.ok(await this.lbCommService.updateEntity(id, data));
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Delete("/:id")
  @ApiOperation({ summary: "删除" })
  async remove(@Param("id") id: string): Promise<ResultData> {
    try {
      return ResultData.ok(await this.lbCommService.destroyOne(id));
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }
}
