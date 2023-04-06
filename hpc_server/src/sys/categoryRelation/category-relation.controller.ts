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
import { CategoryRelationsService } from "./category-relation.service";
import {
  CreateCategoryRelationDto,
  UpdateCategoryRelationDto,
  WhereCategoryRelationDto,
} from "./dto";
import { Auth } from "src/common/decorators/http/auth.decorator";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ResultData } from "src/common/decorators/http/api-result.decorator";
import { PagingCategoryRelationArgs } from "./dto/paging-category-relation.args";
import { handleListParams } from "src/common/utils/utils";
import { CurrentUser } from "src/common/decorators/http/current-user.decorator";
import { User } from "src/user/userInfo/user.entity";

@UseGuards(RolesGuard)
@Controller("categoryRelation")
@ApiBearerAuth("Authorization")
@ApiTags("分类关系模块")
export class CategoryRelationsController {
  constructor(
    private readonly categoryRelationService: CategoryRelationsService
  ) {}

  @Post()
  @Auth()
  @ApiOperation({ summary: "新建" })
  async create(
    @Body() createCategoryRelationDto: CreateCategoryRelationDto
  ): Promise<ResultData> {
    try {
      return ResultData.ok(
        await this.categoryRelationService.createEntity(
          createCategoryRelationDto
        )
      );
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Get()
  @ApiOperation({ summary: "标签列表" })
  async findAll(
    @Query() pagingCategoryRelationArgs: PagingCategoryRelationArgs,
    @CurrentUser() currentUser: User
  ): Promise<ResultData> {
    const { where, orderBy, pagination } = handleListParams(
      pagingCategoryRelationArgs
    );
    try {
      if (!currentUser?.roles && currentUser) {
        where.userId_eq = currentUser.id;
      }
      return ResultData.ok(
        await this.categoryRelationService.findAll(where, pagination, orderBy)
      );
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Get("/findOne/:id")
  @ApiOperation({ summary: "单条" })
  async findOne(@Param("id") id: string): Promise<ResultData> {
    try {
      return ResultData.ok(await this.categoryRelationService.findOneById(id));
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Put()
  @Auth()
  @ApiOperation({ summary: "编辑" })
  async update(
    @Body() updateCategoryRelationDto: UpdateCategoryRelationDto
  ): Promise<ResultData> {
    try {
      const { id, ...data } = updateCategoryRelationDto;
      return ResultData.ok(
        await this.categoryRelationService.updateEntity(id, data)
      );
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Delete("/:id")
  @Auth()
  @Roles("admin")
  @ApiOperation({ summary: "删除" })
  async remove(@Param("id") id: string): Promise<ResultData> {
    try {
      return ResultData.ok(await this.categoryRelationService.destroyOne(id));
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }
}
