import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class WhereArticleDto {

  
  @ApiProperty({ description: "标题" })
  @IsString()
  readonly title_eq?: string;

  @ApiProperty({ description: "标题" })
  @IsString()
  readonly title_contains?: string;

  @ApiProperty({ description: "作者" })
  @IsString()
  readonly author_eq?: string;

  @ApiProperty({ description: "标签查询" })
  @IsString()
  readonly tags_contains?: string;
}
