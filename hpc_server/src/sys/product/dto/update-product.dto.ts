import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";
import { ItemKind } from "src/config/allCfg";

export class UpdateProductDto {
  @IsString()
  readonly id: string;

  @ApiProperty({
    nullable: true,
    enum: ItemKind,
    description: "道具类型 量表永久产权 , 优惠卷 , 其他",
  })
  kind: number;

  @ApiProperty({ nullable: true, description: "道具ID" })
  itemId: string;

  // @OneToOne(() => Lbs)
  // @JoinColumn()
  // item: Lbs;
  @ApiProperty({ nullable: true, description: "分类" })
  categoryIds: any;

  @ApiProperty({ nullable: true, description: "实际价格" })
  price?: number;

  @ApiProperty({ nullable: true, description: "名称" })
  name: string;

  @ApiProperty({ nullable: true, description: "图标 网络图片" })
  icon?: string;

  @ApiProperty({ nullable: true, description: "原价_展示用" })
  showPrice?: number;

  @ApiProperty({ nullable: true, description: "json(道具特殊功能备用)" })
  param?: string;
}
