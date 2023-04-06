import { ApiProperty } from "@nestjs/swagger";
import { generateFlakeID } from "src/common/utils/flake";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("lb_gs")
export class LbGs extends BaseEntity {
  @ApiProperty({ description: "档案号" })
  @PrimaryColumn({ type: "bigint", unsigned: true })
  id: string;

  @ApiProperty({ description: "量表ID", nullable: true })
  @Column({ name: "lbid", type: "varchar" })
  lbid: string;

  @ApiProperty({ description: "name", nullable: true })
  @Column({ name: "name", type: "varchar", width: 256, nullable: true })
  name: string;

  @ApiProperty({ description: "sedge", nullable: true })
  @Column({ name: "sedge", type: "varchar", width: 256 })
  sedge: string;

  @ApiProperty({ description: "eedge", nullable: true })
  @Column({ name: "eedge", type: "varchar", width: 256 })
  eedge: string;

  @ApiProperty({ description: "desc", nullable: true })
  @Column({ name: "desc", type: "varchar", width: 256 })
  desc: string;

  @ApiProperty({ description: "addition1", nullable: true })
  @Column({ name: "addition1", type: "varchar", width: 256 })
  addition1: string;

  @ApiProperty({ description: "addition2", nullable: true })
  @Column({ name: "addition2", type: "varchar", width: 256 })
  addition2: string;

  @ApiProperty({ nullable: true, description: "创建时间" })
  @CreateDateColumn({ name: "created_at", type: "datetime", nullable: true })
  createdAt: Date;

  @ApiProperty({ nullable: true, description: "更新时间" })
  @UpdateDateColumn({ name: "updated_at", type: "datetime", nullable: true })
  updatedAt: Date;

  @ApiProperty({ nullable: true, description: "删除时间" })
  @DeleteDateColumn({ name: "deleted_at", type: "datetime", nullable: true })
  deletedAt: Date;

  @BeforeInsert()
  generateFlakeID() {
    this.id = generateFlakeID();
  }
}
