import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";
import { ItemKind } from "src/config/allCfg";

export class CreateCategoryDto {
  @ApiProperty({ nullable: true, description: "名称" })
  name: string;
}
