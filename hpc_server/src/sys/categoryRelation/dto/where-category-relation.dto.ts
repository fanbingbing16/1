import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class WhereCategoryRelationDto {
  @ApiProperty({ description: "标签名称" })
  @IsString()
  readonly subId_eq?: string;

  @ApiProperty({ description: "标签名称" })
  @IsString()
  readonly categoryId_eq?: string;
}
