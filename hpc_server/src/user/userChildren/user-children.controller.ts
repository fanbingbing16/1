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
import { UserChildrensService } from "./user-children.service";
import {
  CreateUserChildrenDto,
  UpdateUserChildrenDto,
  WhereUserChildrenDto,
} from "./dto";
import { Auth } from "src/common/decorators/http/auth.decorator";
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { ResultData } from "src/common/decorators/http/api-result.decorator";
import { PagingUserChildrenArgs } from "./dto/paging-user-children.args";
import { handleListParams } from "src/common/utils/utils";
import { CurrentUser } from "src/common/decorators/http/current-user.decorator";
import { User } from "../userInfo/user.entity";
@Controller("userChildren")
@Auth()
@ApiBearerAuth("Authorization")
@ApiTags("用户家属模块（用户维护档案）")
export class UserChildrensController {
  constructor(private readonly userChildrenService: UserChildrensService) {}

  @Post()
  @ApiOperation({ summary: "新建家属档案（包括本人）/ 创建家庭成员" })
  async create(
    @Body() createUserChildrenDto: CreateUserChildrenDto,
    @CurrentUser() currentUser: User
  ): Promise<ResultData> {
    try {
      return ResultData.ok(
        await this.userChildrenService.createStudent(
          createUserChildrenDto,
          currentUser
        )
      );
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Get()
  @ApiOperation({ summary: "家庭成员列表" })
  async findAll(
    @Query() pagingUserChildrenArgs: PagingUserChildrenArgs,
    @CurrentUser() currentUser: User
  ): Promise<ResultData> {
    const { where, orderBy, pagination } = handleListParams(
      pagingUserChildrenArgs
    );
    if (!currentUser?.roles && currentUser) {
      where.userId_eq = currentUser.id;
    }
    try {
      return ResultData.ok(
        await this.userChildrenService.findAndPaginate(
          where,
          pagination,
          orderBy
        )
      );
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Get("/findOne/:id")
  @ApiOperation({ summary: "单条" })
  async findOne(@Param("id") id: string): Promise<ResultData> {
    try {
      return ResultData.ok(await this.userChildrenService.findById(id));
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Put()
  @ApiOperation({ summary: "编辑家属档案" })
  async update(
    @Body() updateUserChildrenDto: UpdateUserChildrenDto
  ): Promise<ResultData> {
    try {
      const { id, ...data } = updateUserChildrenDto;
      return ResultData.ok(
        await this.userChildrenService.updateEntity(id, data)
      );
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Delete("/:id")
  @ApiOperation({ summary: "删除" })
  async remove(@Param("id") id: string): Promise<ResultData> {
    try {
      return ResultData.ok(await this.userChildrenService.destroyOne(id));
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }
}
