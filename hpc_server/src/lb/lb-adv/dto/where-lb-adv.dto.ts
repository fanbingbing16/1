import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";
import { PaginationArgs } from "src/common/paginate/connection-paging";
import { FindManyOptions } from "typeorm";

export class WhereLbAdvDto {
  @ApiProperty({ description: "lbid查询" })
  @IsString()
  readonly lbid_eq?: string;
}
