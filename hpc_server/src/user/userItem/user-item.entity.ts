import { ApiBearerAuth, ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, MaxLength } from "class-validator";
import { generateFlakeID } from "src/common/utils/flake";
import { Lbs } from "src/lb/lb-info/entity/lb.entity";
import { Product } from "src/sys/product/product.entity";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { PaymenStatus } from "./user-item.enmu";

@Entity("user_item")
export class UserItem extends BaseEntity {
  @ApiProperty({ description: "ID" })
  @PrimaryColumn({ name: "id", type: "varchar" })
  id: string;

  @ApiProperty({ description: "用户id", nullable: true })
  @Column({
    name: "user_id",
    type: "varchar",
    width: 256,
    nullable: true,
  })
  userId: string;

  @ApiProperty({ nullable: true, description: "商品ID" })
  @Column({ name: "product_id", type: "varchar", width: 256, nullable: true })
  productId: string;

  // @ApiProperty({
  //   nullable: true,
  //   description: "道具类型 量表永久产权 , 优惠卷 , 其他",
  // })
  // @Column({ name: "kind", type: "varchar", width: 10, nullable: true })
  // kind: string;

  // @ApiProperty({ nullable: true, description: "道具ID" })
  // @Column({ name: "item_id", type: "varchar", width: 256, nullable: true })
  // itemId: string;

  // @OneToOne(() => Lbs)
  // @JoinColumn()
  // item: Lbs;

  @ApiProperty({ nullable: true, description: "道具剩余数量" })
  @Column({ name: "count", type: "int", width: 11, nullable: true })
  count: number;

  @ApiProperty({ nullable: true, description: "过期时间" })
  @Column({ name: "outime", type: "datetime", nullable: true })
  outime: Date;

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

  @JoinColumn()
  @OneToOne(() => Product)
  product: Product;

  @BeforeInsert()
  generateFlakeID() {
    this.id = generateFlakeID();
  }
}
