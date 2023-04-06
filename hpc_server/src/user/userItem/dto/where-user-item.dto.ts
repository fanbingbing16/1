import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class WhereUserItemDto {
  @ApiProperty({ description: "商品Id" })
  @IsString()
  readonly productId_eq?: string;
}
