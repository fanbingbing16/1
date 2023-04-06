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
import { UserOrdersService } from "./user-order.service";
import {
  CreateUserOrderDto,
  UpdateUserOrderDto,
  WhereUserOrderDto,
} from "./dto";
import { Auth } from "src/common/decorators/http/auth.decorator";
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { ResultData } from "src/common/decorators/http/api-result.decorator";
import { PagingUserOrderArgs } from "./dto/paging-user-order.args";
import { handleListParams } from "src/common/utils/utils";
import { CurrentUser } from "src/common/decorators/http/current-user.decorator";
import { User } from "../userInfo/user.entity";

@UseGuards(RolesGuard)
@Controller("userOrder")
@Auth()
@ApiBearerAuth("Authorization")
@ApiTags("用户订单模块")
export class UserOrdersController {
  constructor(private readonly userOrderService: UserOrdersService) {}

  @Post()
  @ApiOperation({ summary: "新建订单" })
  async create(
    @Body() createUserOrderDto: CreateUserOrderDto,
    @CurrentUser() currentUser: User
  ): Promise<ResultData> {
    try {
      return ResultData.ok(
        await this.userOrderService.createUserOrder(
          createUserOrderDto,
          currentUser
        )
      );
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Get()
  @ApiOperation({ summary: "列表" })
  async findAll(
    @Query() pagingUserOrderArgs: PagingUserOrderArgs,
    @CurrentUser() currentUser: User
  ): Promise<ResultData> {
    const { where, orderBy, pagination } =
      handleListParams(pagingUserOrderArgs);
    try {
      if (!currentUser?.roles && currentUser) {
        where.userId_eq = currentUser.id;
      }
      return ResultData.ok(
        await this.userOrderService.findAndPaginate(where, pagination, orderBy)
      );
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Get("/findOne/:id")
  @ApiOperation({ summary: "单条" })
  async findOne(@Param("id") id: string): Promise<ResultData> {
    try {
      return ResultData.ok(await this.userOrderService.findById(id));
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Put()
  @ApiOperation({ summary: "编辑" })
  async update(
    @Body() updateUserOrderDto: UpdateUserOrderDto
  ): Promise<ResultData> {
    try {
      const { id, ...data } = updateUserOrderDto;
      return ResultData.ok(await this.userOrderService.updateEntity(id, data));
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Delete("/:id")
  @ApiOperation({ summary: "删除" })
  async remove(@Param("id") id: string): Promise<ResultData> {
    try {
      return ResultData.ok(await this.userOrderService.destroyOne(id));
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }
}
