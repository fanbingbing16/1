import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";
import { PaginationArgs } from "src/common/paginate/connection-paging";
import { FindManyOptions } from "typeorm";

export class WhereUserRecordDto {
  @ApiProperty({ description: "名称" })
  @IsString()
  readonly name_eq?: string;

  @ApiProperty({ description: "状态查询" })
  @IsString()
  readonly status_eq?: string;
}
