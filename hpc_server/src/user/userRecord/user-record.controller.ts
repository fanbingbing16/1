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
import { UserRecordsService } from "./user-record.service";
import {
  CreateUserRecordDto,
  UpdateUserRecordDto,
  WhereUserRecordDto,
} from "./dto";
import { Auth } from "src/common/decorators/http/auth.decorator";
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { ResultData } from "src/common/decorators/http/api-result.decorator";
import { PagingUserRecordArgs } from "./dto/paging-user-record.args";
import { handleListParams } from "src/common/utils/utils";
import { CurrentUser } from "src/common/decorators/http/current-user.decorator";
import { User } from "../userInfo/user.entity";

@UseGuards(RolesGuard)
@Controller("userRecord")
@Auth()
@ApiBearerAuth("Authorization")
@ApiTags("用户做题模块")
export class UserRecordsController {
  constructor(private readonly userRecordService: UserRecordsService) {}

  @Post()
  @ApiOperation({ summary: "新建做题" })
  async create(
    @Body() createUserRecordDto: CreateUserRecordDto,
    @CurrentUser() currentUser: User
  ): Promise<ResultData> {
    try {
      return ResultData.ok(
        await this.userRecordService.createUserRecord(
          createUserRecordDto,
          currentUser
        )
      );
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Post("/submitUserRecord")
  @ApiOperation({ summary: "提交量表" })
  async submitUserRecord(
    @Body() updateUserRecordDto: UpdateUserRecordDto
  ): Promise<ResultData> {
    try {
      return ResultData.ok(
        await this.userRecordService.submitUserRecord(updateUserRecordDto)
      );
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Post("/stagingUserRecord")
  @ApiOperation({ summary: "暂存量表" })
  async stagingUserRecord(
    @Body() updateUserRecordDto: UpdateUserRecordDto
  ): Promise<ResultData> {
    try {
      return ResultData.ok(
        await this.userRecordService.stagingUserRecord(updateUserRecordDto)
      );
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Get()
  @ApiOperation({ summary: "列表" })
  async findAll(
    @Query() pagingUserRecordArgs: PagingUserRecordArgs,
    @CurrentUser() currentUser: User
  ): Promise<ResultData> {
    const { where, orderBy, pagination } =
      handleListParams(pagingUserRecordArgs);
    try {
      if (!currentUser?.roles && currentUser) {
        where.userId_eq = currentUser.id;
      }
      return ResultData.ok(
        // await this.userRecordService.findAndPaginate(where, pagination, orderBy)
        await this.userRecordService.findAll(where, pagination, orderBy)
      );
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Get("/findOne/:id")
  @ApiOperation({ summary: "单条" })
  async findOne(@Param("id") id: string): Promise<ResultData> {
    try {
      return ResultData.ok(await this.userRecordService.findById(id));
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Put()
  @ApiOperation({ summary: "编辑" })
  async update(
    @Body() updateUserRecordDto: UpdateUserRecordDto
  ): Promise<ResultData> {
    try {
      const { id, collectJson, ...data } = updateUserRecordDto;
      return ResultData.ok(
        await this.userRecordService.updateEntity(id, {
          ...data,
          collectJson: JSON.stringify(collectJson),
        })
      );
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }

  @Delete("/:id")
  @ApiOperation({ summary: "删除" })
  async remove(@Param("id") id: string): Promise<ResultData> {
    try {
      return ResultData.ok(await this.userRecordService.destroyOne(id));
    } catch (error) {
      return ResultData.fail(0, error.toString());
    }
  }
}
