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
import { ArticlesService } from "./article.service";
import { CreateArticleDto, UpdateArticleDto, WhereArticleDto } from "./dto";
import { Auth } from "src/common/decorators/http/auth.decorator";
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { ResultData } from "src/common/decorators/http/api-result.decorator";
import { PagingArticleArgs } from "./dto/paging-article.args";
import { handleListParams } from "src/common/utils/utils";
import { CurrentUser } from "src/common/decorators/http/current-user.decorator";
import { User } from "src/user/userInfo/user.entity";
import { CategorysService } from "../category/category.service";
import { CategoryRelationsService } from "../categoryRelation/category-relation.service";

@UseGuards(RolesGuard)
@Controller("article")
@ApiBearerAuth("Authorization")
@ApiTags("文章模块")
export class ArticlesController {
  constructor(
    private readonly articleService: ArticlesService,
    private readonly categoryRelationsService: CategoryRelationsService
  ) {}

  @Post()
  @Auth()
  @ApiOperation({ summary: "新建" })
  async create(
    @Body() createArticleDto: CreateArticleDto
  ): Promise<ResultData> {
    try {
      const article = await this.articleService.createEntity(createArticleDto);
      if (createArticleDto.categoryIds.length > 0) {
        this.categoryRelationsService.editCategoryRelation(
          createArticleDto.categoryIds,
          article.id
        );
      }
      return ResultData.ok(article);
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Get()
  @ApiOperation({ summary: "文章列表" })
  async findAll(
    @Query() pagingArticleArgs: PagingArticleArgs,
    @CurrentUser() currentUser: User
  ): Promise<ResultData> {
    const { where, orderBy, pagination } = handleListParams(pagingArticleArgs);
    try {
      if (!currentUser?.roles && currentUser) {
        where.userId_eq = currentUser.id;
      }
      return ResultData.ok(
        await this.articleService.findAll(where, pagination, orderBy)
      );
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Get("/findOne/:id")
  @ApiOperation({ summary: "单条" })
  async findOne(@Param("id") id: string): Promise<ResultData> {
    try {
      return ResultData.ok(await this.articleService.findOneById(id));
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Put()
  @Auth()
  @ApiOperation({ summary: "编辑" })
  async update(
    @Body() updateArticleDto: UpdateArticleDto
  ): Promise<ResultData> {
    try {
      const { id, ...data } = updateArticleDto;
      if (data.categoryIds.length > 0) {
        this.categoryRelationsService.editCategoryRelation(
          data.categoryIds,
          id
        );
      }
      return ResultData.ok(await this.articleService.updateEntity(id, data));
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
      return ResultData.ok(await this.articleService.destroyOne(id));
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }
}
