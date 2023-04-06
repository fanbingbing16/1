import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNumber, IsString } from "class-validator";
import { PaginationArgs } from "src/common/paginate/connection-paging";
import { FindManyOptions } from "typeorm";

export class WhereUserOrderDto {
  @ApiProperty({ description: "用户Id" })
  @IsString()
  readonly userId_eq?: string;

  @ApiProperty({ description: "支付状态" })
  @IsNumber()
  readonly status_eq?: number;
}
