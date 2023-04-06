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

@Entity("lb_xx")
export class LbXx extends BaseEntity {
  @ApiProperty({ description: "档案号" })
  @PrimaryColumn({ type: "bigint", unsigned: true })
  id: string;

  @ApiProperty({ description: "试题id", nullable: true })
  @Column({ name: "stid", type: "bigint", unsigned: false })
  stid: string;

  @ApiProperty({ description: "量表id", nullable: true })
  @Column({ name: "lbid", type: "bigint", unsigned: false })
  lbid: string;

  @ApiProperty({ description: "snum", nullable: true })
  @Column({ name: "snum", type: "bigint", unsigned: true, nullable: true })
  snum: string;

  @ApiProperty({ description: "试题内容", nullable: true })
  @Column({ name: "content", type: "varchar", width: 256 })
  content: string;

  @ApiProperty({ description: "得分", nullable: true })
  @Column({ name: "score", type: "varchar", width: 256 })
  score: string;

  @ApiProperty({ description: "multisel", nullable: true })
  @Column({ name: "multisel", type: "varchar", width: 256 })
  multisel: string;

  @ApiProperty({ description: "evatype", nullable: true })
  @Column({ name: "evatype", type: "varchar", width: 256 })
  evatype: string;

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
