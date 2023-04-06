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
import { CategorysService } from "./category.service";
import { CreateCategoryDto, UpdateCategoryDto, WhereCategoryDto } from "./dto";
import { Auth } from "src/common/decorators/http/auth.decorator";
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { ResultData } from "src/common/decorators/http/api-result.decorator";
import { PagingCategoryArgs } from "./dto/paging-category.args";
import { handleListParams } from "src/common/utils/utils";
import { CurrentUser } from "src/common/decorators/http/current-user.decorator";
import { User } from "src/user/userInfo/user.entity";

@UseGuards(RolesGuard)
@Controller("category")
@ApiBearerAuth("Authorization")
@ApiTags("分类模块")
export class CategorysController {
  constructor(private readonly categoryService: CategorysService) {}

  @Post()
  @Auth()
  @ApiOperation({ summary: "新建" })
  async create(
    @Body() createCategoryDto: CreateCategoryDto
  ): Promise<ResultData> {
    try {
      return ResultData.ok(
        await this.categoryService.createEntity(createCategoryDto)
      );
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Get()
  @ApiOperation({ summary: "标签列表" })
  async findAll(
    @Query() pagingCategoryArgs: PagingCategoryArgs,
    @CurrentUser() currentUser: User
  ): Promise<ResultData> {
    const { where, orderBy, pagination } = handleListParams(pagingCategoryArgs);
    try {
      if (!currentUser?.roles && currentUser) {
        where.userId_eq = currentUser.id;
      }
      return ResultData.ok(
        await this.categoryService.findAll(where, pagination, orderBy)
      );
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Get("/findOne/:id")
  @ApiOperation({ summary: "单条" })
  async findOne(@Param("id") id: string): Promise<ResultData> {
    try {
      return ResultData.ok(await this.categoryService.findOneById(id));
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Put()
  @Auth()
  @ApiOperation({ summary: "编辑" })
  async update(
    @Body() updateCategoryDto: UpdateCategoryDto
  ): Promise<ResultData> {
    try {
      const { id, ...data } = updateCategoryDto;
      return ResultData.ok(await this.categoryService.updateEntity(id, data));
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
      return ResultData.ok(await this.categoryService.destroyOne(id));
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }
}
