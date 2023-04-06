import { ApiBearerAuth, ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, MaxLength } from "class-validator";
import { generateFlakeID } from "src/common/utils/flake";
import { ItemKind } from "src/config/allCfg";
import { Lbs } from "src/lb/lb-info/entity/lb.entity";
import { UserItem } from "src/user/userItem/user-item.entity";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { ProductStatus } from "./interfaces/product.interface";

@Entity("sys_product")
export class Product extends BaseEntity {
  @ApiProperty({ description: "ID" })
  @PrimaryColumn({ name: "id", type: "varchar" })
  id: string;

  @ApiProperty({
    nullable: true,
    description: "道具类型 量表永久产权 , 优惠卷 , 其他",
  })
  @Column({
    name: "kind",
    type: "enum",
    enum: ItemKind,
    default: ItemKind.lbOne,
    nullable: true,
  })
  kind: number;

  @ApiProperty({ nullable: true, description: "道具ID" })
  @Column({ name: "item_id", type: "varchar", width: 256, nullable: true })
  itemId: string;

  // @OneToOne(() => Lbs)
  // @JoinColumn()
  // item: Lbs;

  @ApiProperty({ nullable: true, description: "分类" })
  @Column({ name: "category_ids", type: "json", nullable: true })
  categoryIds: string;

  @ApiProperty({ nullable: true, description: "实际价格" })
  @Column({ name: "price", type: "float", width: 11, nullable: true })
  price: number;

  @ApiProperty({ nullable: true, description: "名称" })
  @Column({ name: "name", type: "varchar", width: 100, nullable: true })
  name: string;

  @ApiProperty({ nullable: true, description: "图标 网络图片" })
  @Column({ name: "icon", type: "varchar", width: 256, nullable: true })
  icon: string;

  @ApiProperty({ nullable: true, description: "原价_展示用" })
  @Column({ name: "show_price", type: "float", width: 11, nullable: true })
  showPrice: number;

  @ApiProperty({ nullable: true, description: "json(道具特殊功能备用)" })
  @Column({ name: "param", type: "json", nullable: true })
  param: string;

  @ApiProperty({
    nullable: true,
    description: "状态 0:禁用 -1:启用",
  })
  @Column({
    name: "status",
    type: "enum",
    enum: ProductStatus,
    default: ProductStatus.DISABLE,
  })
  @MaxLength(1)
  status: number;

  @ApiProperty({ nullable: true, description: "创建时间" })
  @CreateDateColumn({ name: "created_at", type: "datetime", nullable: true })
  createdAt: Date;

  @ApiProperty({ nullable: true, description: "更新时间" })
  @UpdateDateColumn({ name: "updated_at", type: "datetime", nullable: true })
  updatedAt: Date;

  @ApiProperty({ nullable: true, description: "删除时间" })
  @DeleteDateColumn({
    name: "deleted_at",
    type: "datetime",
    nullable: true,
  })
  deletedAt: Date;

  @BeforeInsert()
  generateFlakeID() {
    this.id = generateFlakeID();
  }
}
