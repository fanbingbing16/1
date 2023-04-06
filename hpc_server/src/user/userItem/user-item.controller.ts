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
import { UserItemsService } from "./user-item.service";
import { CreateUserItemDto, UpdateUserItemDto, WhereUserItemDto } from "./dto";
import { Auth } from "src/common/decorators/http/auth.decorator";
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { ResultData } from "src/common/decorators/http/api-result.decorator";
import { PagingUserItemArgs } from "./dto/paging-user-item.args";
import { handleListParams } from "src/common/utils/utils";
import { CurrentUser } from "src/common/decorators/http/current-user.decorator";
import { User } from "../userInfo/user.entity";

@UseGuards(RolesGuard)
@Controller("userItem")
@Auth()
@ApiBearerAuth("Authorization")
@ApiTags("用户道具模块")
export class UserItemsController {
  constructor(private readonly userItemService: UserItemsService) {}

  @Post()
  @ApiOperation({ summary: "新建" })
  async create(
    @Body() createUserItemDto: CreateUserItemDto
  ): Promise<ResultData> {
    try {
      return ResultData.ok(
        await this.userItemService.createEntity(createUserItemDto)
      );
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Get()
  @ApiOperation({ summary: "用户道具列表" })
  async findAll(
    @Query() pagingUserItemArgs: PagingUserItemArgs,
    @CurrentUser() currentUser: User
  ): Promise<ResultData> {
    const { where, orderBy, pagination } = handleListParams(pagingUserItemArgs);
    try {
      if (!currentUser?.roles && currentUser) {
        where.userId_eq = currentUser.id;
      }
      return ResultData.ok(
        await this.userItemService.findAll(where, pagination, orderBy)
      );
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Get("/findOne/:id")
  @ApiOperation({ summary: "单条" })
  async findOne(@Param("id") id: string): Promise<ResultData> {
    try {
      return ResultData.ok(await this.userItemService.findOneById(id));
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Put()
  @ApiOperation({ summary: "编辑" })
  async update(
    @Body() updateUserItemDto: UpdateUserItemDto
  ): Promise<ResultData> {
    try {
      const { id, ...data } = updateUserItemDto;
      return ResultData.ok(await this.userItemService.updateEntity(id, data));
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Delete("/:id")
  @ApiOperation({ summary: "删除" })
  async remove(@Param("id") id: string): Promise<ResultData> {
    try {
      return ResultData.ok(await this.userItemService.destroyOne(id));
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }
}
