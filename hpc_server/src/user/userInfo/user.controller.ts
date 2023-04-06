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
import { UsersService } from "./user.service";
import { CreateUserDto, UpdateUserDto, WhereUserDto } from "./dto";
import { Auth } from "src/common/decorators/http/auth.decorator";
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { ResultData } from "src/common/decorators/http/api-result.decorator";
import { PagingUserArgs } from "./dto/paging-user.args";
import { handleListParams } from "src/common/utils/utils";

@UseGuards(RolesGuard)
@Controller("user")
@Auth()
@ApiBearerAuth("Authorization")
@ApiTags("用户模块")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @Roles("admin")
  @ApiOperation({ summary: "新建" })
  async create(@Body() createUserDto: CreateUserDto): Promise<ResultData> {
    try {
      return ResultData.ok(await this.userService.createEntity(createUserDto));
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Get()
  @ApiOperation({ summary: "列表" })
  async findAll(@Query() pagingUserArgs: PagingUserArgs): Promise<ResultData> {
    const { where, orderBy, pagination } = handleListParams(pagingUserArgs);
    try {
      return ResultData.ok(
        await this.userService.findAndPaginate(where, pagination, orderBy)
      );
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Get("/findOne/:id")
  @ApiOperation({ summary: "单条" })
  async findOne(@Param("id") id: string): Promise<ResultData> {
    try {
      return ResultData.ok(await this.userService.findById(id));
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Put()
  @ApiOperation({ summary: "编辑" })
  async update(@Body() updateUserDto: UpdateUserDto): Promise<ResultData> {
    try {
      const { id, ...data } = updateUserDto;
      return ResultData.ok(await this.userService.updateEntity(id, data));
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Delete("/:id")
  @ApiOperation({ summary: "删除" })
  async remove(@Param("id") id: string): Promise<ResultData> {
    try {
      return ResultData.ok(await this.userService.destroyOne(id));
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }
}
