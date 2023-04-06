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

@Entity("sys_category")
export class Category extends BaseEntity {
  @ApiProperty({ description: "ID" })
  @PrimaryColumn({ name: "id", type: "varchar" })
  id: string;

  @ApiProperty({ nullable: true, description: "名称" })
  @Column({ name: "name", type: "varchar", width: 100, nullable: true })
  name: string;

  @ApiProperty({ nullable: true, description: "类型" })
  @Column({ name: "type", type: "varchar", width: 100, nullable: true })
  type: string;

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
