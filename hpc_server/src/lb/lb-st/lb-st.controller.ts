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
import { LbStService } from "./lb-st.service";
import { Auth } from "src/common/decorators/http/auth.decorator";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ResultData } from "src/common/decorators/http/api-result.decorator";
import { PagingLbStArgs } from "./dto/paging-lb-st.args";
import { handleListParams } from "src/common/utils/utils";
import { CreateLbStDto } from "./dto/create-lb-st.dto";
import { UpdateLbStDto } from "./dto/update-lb-st.dto";

@Controller("lbSt")
@Auth()
@ApiBearerAuth("Authorization")
@ApiTags("量表试题模块")
export class LbStController {
  constructor(private readonly lbStService: LbStService) {}

  @Post()
  @ApiOperation({ summary: "新建" })
  async create(@Body() createLbStDto: CreateLbStDto): Promise<ResultData> {
    try {
      return ResultData.ok(
        await this.lbStService.createEntity(createLbStDto)
      );
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Get()
  @ApiOperation({ summary: "列表" })
  async findAll(
    @Query() pagingLbStArgs: PagingLbStArgs
  ): Promise<ResultData> {
    const { where, orderBy, pagination } = handleListParams(pagingLbStArgs);
    try {
      return ResultData.ok(
        await this.lbStService.findAndPaginate(where, pagination, orderBy)
      );
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Get("/findOne/:id")
  @ApiOperation({ summary: "单条" })
  async findOne(@Param("id") id: string): Promise<ResultData> {
    try {
      return ResultData.ok(await this.lbStService.findById(id));
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Put()
  @ApiOperation({ summary: "编辑" })
  async update(@Body() updateLbStDto: UpdateLbStDto): Promise<ResultData> {
    try {
      const { id, ...data } = updateLbStDto;
      return ResultData.ok(await this.lbStService.updateEntity(id, data));
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Delete("/:id")
  @ApiOperation({ summary: "删除" })
  async remove(@Param("id") id: string): Promise<ResultData> {
    try {
      return ResultData.ok(await this.lbStService.destroyOne(id));
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }
}
