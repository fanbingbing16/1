import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNumber, IsString } from "class-validator";
import { PaginationArgs } from "src/common/paginate/connection-paging";
import { FindManyOptions } from "typeorm";

export class WhereLbsDto {
  @ApiProperty({ description: "名称" })
  @IsString()
  readonly name_eq?: string;

  @ApiProperty({ description: "分类查询" })
  @IsString()
  readonly suitcrowd_eq?: string;

  @ApiProperty({ description: "状态查询" })
  @IsNumber()
  readonly status_eq?: string;
}
