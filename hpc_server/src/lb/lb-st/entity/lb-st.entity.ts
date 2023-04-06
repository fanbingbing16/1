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

@Entity("lb_st")
export class LbSt extends BaseEntity {
  @ApiProperty({ description: "档案号" })
  @PrimaryColumn({ type: "bigint", unsigned: true })
  id: string;

  @ApiProperty({ description: "量表id", nullable: true })
  @Column({ name: "lbid", type: "bigint", unsigned: true })
  lbid: string;

  @ApiProperty({ description: "", nullable: true })
  @Column({ name: "sernum", type: "varchar" })
  sernum: string;

  @ApiProperty({ description: "试题名称", nullable: true })
  @Column({ name: "stname", type: "varchar", width: 256 })
  stname: string;

  @ApiProperty({ description: "", nullable: true })
  @Column({ name: "anstype", type: "varchar", width: 256 })
  anstype: string;

  @ApiProperty({ description: "", nullable: true })
  @Column({ name: "evatype", type: "varchar", width: 256 })
  evatype: string;

  @ApiProperty({ description: "", nullable: true })
  @Column({ name: "monthage", type: "varchar", width: 256 })
  monthage: string;

  @ApiProperty({ description: "", nullable: true })
  @Column({ name: "refscore", type: "varchar", width: 256 })
  refscore: string;

  @ApiProperty({ description: "", nullable: true })
  @Column({ name: "stdetail", type: "text" })
  stdetail: string;

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
