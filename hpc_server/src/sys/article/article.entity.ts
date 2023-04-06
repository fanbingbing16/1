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

@Entity("sys_article")
export class Article extends BaseEntity {
  @ApiProperty({ description: "ID" })
  @PrimaryColumn({ name: "id", type: "varchar" })
  id: string;

  @ApiProperty({
    nullable: true,
    description: "标题",
  })
  @Column({
    name: "title",
    type: "varchar",
    width: 256,
    nullable: true,
  })
  title: string;

  @ApiProperty({ nullable: true, description: "外部图片" })
  @Column({ name: "icon", type: "varchar", width: 256, nullable: true })
  icon: string;

  // @OneToOne(() => Lbs)
  // @JoinColumn()
  // item: Lbs;

  @ApiProperty({ nullable: true, description: "分类" })
  @Column({ name: "category_ids", type: "json", nullable: true })
  categoryIds: string;

  @ApiProperty({ nullable: true, description: "作者" })
  @Column({ name: "author", type: "varchar", width: 11, nullable: true })
  author: string;

  @ApiProperty({ nullable: true, description: "内容 富文本字段" })
  @Column({ name: "content", type: "longtext", nullable: true })
  content: string;

  @ApiProperty({ nullable: true, description: "观看次数" })
  @Column({ name: "look", type: "int", width: 11, nullable: true, default: 0 })
  look: number;

  @ApiProperty({ nullable: true, description: "点赞次数" })
  @Column({ name: "zan", type: "int", width: 11, nullable: true, default: 0 })
  zan: number;

  @ApiProperty({ nullable: true, description: "权重" })
  @Column({ name: "weight", type: "int", width: 11, nullable: true })
  weight: number;

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
