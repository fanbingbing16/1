import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class UpdateArticleDto {
  @ApiProperty({ nullable: true, description: "id" })
  id: string;

  @ApiProperty({
    nullable: true,
    description: "标题",
  })
  title: string;

  @ApiProperty({ nullable: true, description: "外部图片" })
  icon: string;

  // @OneToOne(() => Lbs)
  // @JoinColumn()
  // item: Lbs;
  @ApiProperty({ nullable: true, description: "分类" })
  categoryIds: any;

  @ApiProperty({ nullable: true, description: "作者" })
  author: string;

  @ApiProperty({ nullable: true, description: "内容 富文本字段" })
  content: string;

  @ApiProperty({ nullable: true, description: "观看次数" })
  look: number;

  @ApiProperty({ nullable: true, description: "点赞次数" })
  zan: number;

  @ApiProperty({ nullable: true, description: "权重" })
  weight: number;

  @ApiProperty({ nullable: true, description: "创建时间" })
  createdAt: Date;

  @ApiProperty({ nullable: true, description: "更新时间" })
  updatedAt: Date;
}
