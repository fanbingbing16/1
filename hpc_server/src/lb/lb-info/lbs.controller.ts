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
import { LbsService } from "./lbs.service";
import { CreateLbsDto, UpdateLbsDto } from "./dto";
import { Auth } from "src/common/decorators/http/auth.decorator";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ResultData } from "src/common/decorators/http/api-result.decorator";
import { PagingLbsArgs } from "./dto/paging-lbs.args";
import { handleListParams } from "src/common/utils/utils";
import { User } from "src/user/userInfo/user.entity";
import { CurrentUser } from "src/common/decorators/http/current-user.decorator";
import { QueryDetailDto } from "./dto/query-detail-lbs.dto";
import { CategoryRelationsService } from "src/sys/categoryRelation/category-relation.service";

@Controller("lbs")
@ApiBearerAuth("Authorization")
@ApiTags("量表模块")
// @Auth("/lbs/getDetail")
export class LbsController {
  constructor(
    private readonly lbsService: LbsService,
    private readonly categoryRelationsService: CategoryRelationsService
  ) {}

  @Post()
  @ApiOperation({ summary: "新建" })
  async create(@Body() createLbsDto: CreateLbsDto): Promise<ResultData> {
    try {
      const lbs = await this.lbsService.createEntity(createLbsDto);
      if (createLbsDto.categoryIds.length > 0) {
        this.categoryRelationsService.editCategoryRelation(
          createLbsDto.categoryIds,
          lbs.id
        );
      }
      return ResultData.ok(lbs);
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Get()
  @ApiOperation({ summary: "列表" })
  async findAll(@Query() pagingLbsArgs: PagingLbsArgs): Promise<ResultData> {
    const { where, orderBy, pagination } = handleListParams(pagingLbsArgs);
    try {
      return ResultData.ok(
        await this.lbsService.findAll(where, pagination, orderBy)
      );
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Get("findOne/:id")
  @ApiOperation({ summary: "单条" })
  async findOne(@Param("id") id: string): Promise<ResultData> {
    try {
      return ResultData.ok(await this.lbsService.findById(id));
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Get("/getDetail")
  @ApiOperation({ summary: "获取单条详情 userItem userRecord" })
  async getDetail(
    // @Param("id") id: string,
    // @CurrentUser() currentUser: User,
    @Query() query: QueryDetailDto
  ): Promise<ResultData> {
    try {
      return ResultData.ok(
        await this.lbsService.findOneById(
          query.id,
          query.userId,
          query.childrenId
        )
      );
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Put()
  @Auth()
  @ApiOperation({ summary: "编辑" })
  async update(@Body() updateLbsDto: UpdateLbsDto): Promise<ResultData> {
    try {
      const { id, ...data } = updateLbsDto;
      if (data.categoryIds.length > 0) {
        this.categoryRelationsService.editCategoryRelation(
          data.categoryIds,
          String(id)
        );
      }
      return ResultData.ok(await this.lbsService.updateEntity(id, data));
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Delete("/:id")
  @Auth()
  @ApiOperation({ summary: "删除" })
  async remove(@Param("id") id: string): Promise<ResultData> {
    try {
      return ResultData.ok(await this.lbsService.destroyOne(id));
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Get("/category")
  @ApiOperation({ summary: "量表分类" })
  async category1(): Promise<ResultData> {
    try {
      return ResultData.ok(await this.lbsService.findLbCategory());
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }
}
