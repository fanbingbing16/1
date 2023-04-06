import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class WhereProductDto {
  @ApiProperty({ description: "商品名称" })
  @IsString()
  readonly name_eq?: string;

  @ApiProperty({ description: "商品名称" })
  @IsString()
  readonly name_contains?: string;

  @ApiProperty({ description: "量表Id" })
  @IsString()
  readonly itemId_eq?: string;

  @ApiProperty({ description: "状态" })
  readonly status_eq?: number;
}
