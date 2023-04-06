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

@Entity("lb_comm")
export class LbComm extends BaseEntity {
  @ApiProperty({ description: "档案号", nullable: true })
  @PrimaryColumn({ type: "bigint", unsigned: true })
  id: string;

  @ApiProperty({ description: "部门ID", nullable: true })
  @Column({ name: "lbid", type: "bigint", unsigned: true })
  lbid: string;

  @ApiProperty({ description: "", nullable: true })
  @Column({ name: "sedge", type: "varchar", width: 256, nullable: true })
  sedge: string;

  @ApiProperty({ description: "", nullable: true })
  @Column({ name: "eedge", type: "varchar", width: 256, nullable: true })
  eedge: string;

  @ApiProperty({ description: "", nullable: true })
  @Column({ name: "tscore", type: "varchar", width: 256, nullable: true })
  tscore: string;

  @ApiProperty({ description: "", nullable: true })
  @Column({ name: "type", type: "varchar", width: 256, nullable: true })
  type: string;

  @ApiProperty({ description: "", nullable: true })
  @Column({ name: "sage", type: "varchar", width: 256, nullable: true })
  sage: string;

  @ApiProperty({ description: "", nullable: true })
  @Column({ name: "eage", type: "varchar", width: 256, nullable: true })
  eage: string;

  @ApiProperty({ description: "", nullable: true })
  @Column({ name: "remark", type: "varchar", width: 256, nullable: true })
  remark: string;

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
