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
import { ProductsService } from "./product.service";
import { CreateProductDto, UpdateProductDto, WhereProductDto } from "./dto";
import { Auth } from "src/common/decorators/http/auth.decorator";
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { ResultData } from "src/common/decorators/http/api-result.decorator";
import { PagingProductArgs } from "./dto/paging-product.args";
import { handleListParams } from "src/common/utils/utils";
import { CurrentUser } from "src/common/decorators/http/current-user.decorator";
import { User } from "src/user/userInfo/user.entity";

@UseGuards(RolesGuard)
@Controller("product")
@ApiBearerAuth("Authorization")
@ApiTags("商品模块")
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  @Auth()
  @ApiOperation({ summary: "新建" })
  async create(
    @Body() createProductDto: CreateProductDto
  ): Promise<ResultData> {
    try {
      return ResultData.ok(
        await this.productService.createEntity(createProductDto)
      );
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Get()
  @ApiOperation({ summary: "商品列表" })
  async findAll(
    @Query() pagingProductArgs: PagingProductArgs,
    @CurrentUser() currentUser: User
  ): Promise<ResultData> {
    const { where, orderBy, pagination } = handleListParams(pagingProductArgs);
    try {
      if (!currentUser?.roles && currentUser) {
        where.userId_eq = currentUser.id;
      }
      return ResultData.ok(
        await this.productService.findAll(where, pagination, orderBy)
      );
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Get("/findOne/:id")
  @ApiOperation({ summary: "单条" })
  async findOne(@Param("id") id: string): Promise<ResultData> {
    try {
      return ResultData.ok(await this.productService.findOneById(id));
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Put()
  @Auth()
  @ApiOperation({ summary: "编辑" })
  async update(
    @Body() updateProductDto: UpdateProductDto
  ): Promise<ResultData> {
    try {
      const { id, ...data } = updateProductDto;
      return ResultData.ok(await this.productService.updateEntity(id, data));
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Delete("/:id")
  @Auth()
  @Roles('admin')
  @ApiOperation({ summary: "删除" })
  async remove(@Param("id") id: string): Promise<ResultData> {
    try {
      return ResultData.ok(await this.productService.destroyOne(id));
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }
}
