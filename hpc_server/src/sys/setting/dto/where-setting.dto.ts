import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";
import { PaginationArgs } from "src/common/paginate/connection-paging";
import { FindManyOptions } from "typeorm";

export class WhereSettingDto {
  @ApiProperty({ description: "key值查询" })
  @IsString()
  readonly key_eq?: string;
}
