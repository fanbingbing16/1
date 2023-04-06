import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";
import { PaginationArgs } from "src/common/paginate/connection-paging";
import { FindManyOptions } from "typeorm";

export class WhereOpenAuthDto {
  @ApiProperty({ description: "名称" })
  @IsString()
  readonly name_eq?: string;
}
