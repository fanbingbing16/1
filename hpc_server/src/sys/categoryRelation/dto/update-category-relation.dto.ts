import { ApiProperty } from "@nestjs/swagger";
export class UpdateCategoryRelationDto {

  readonly id: string;
  @ApiProperty({ nullable: true, description: "分类id" })
  categoryId: string;
  @ApiProperty({ nullable: true, description: "主体id" })
  subId: string;
}
