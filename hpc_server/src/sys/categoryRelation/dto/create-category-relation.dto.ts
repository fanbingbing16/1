import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";
import { ItemKind } from "src/config/allCfg";

export class CreateCategoryRelationDto {
  @ApiProperty({ nullable: true, description: "分类id" })
  categoryId: string;
  @ApiProperty({ nullable: true, description: "主体id" })
  subId: string;
}
