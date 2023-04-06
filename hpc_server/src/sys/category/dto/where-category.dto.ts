import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class WhereCategoryDto {
  @ApiProperty({ description: "标签名称" })
  @IsString()
  readonly name_eq?: string;

  @ApiProperty({ description: "标签名称" })
  @IsString()
  readonly name_contains?: string;
}
