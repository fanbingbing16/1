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

@Entity("lb_adv")
export class LbAdv extends BaseEntity {
  @ApiProperty({ description: "档案号" })
  @PrimaryColumn({ type: "bigint", unsigned: true })
  id: string;

  @ApiProperty({ description: "量表id", nullable: true })
  @Column({ name: "lbid", type: "varchar", nullable: true })
  lbid: string;

  @ApiProperty({ description: "能区", nullable: true })
  @Column({ name: "nengqu", type: "varchar", nullable: true })
  nengqu: string;

  @ApiProperty({ description: "start日期", nullable: true })
  @Column({ name: "smonth", type: "varchar", nullable: true })
  smonth: string;

  @ApiProperty({ description: "end日期", nullable: true })
  @Column({ name: "emonth", type: "varchar", nullable: true })
  emonth: string;

  @ApiProperty({ description: "指导建议", nullable: true })
  @Column({ name: "adv", type: "text", nullable: true })
  adv: string;

  @ApiProperty({ description: "range", nullable: true })
  @Column({ name: "mrange", type: "varchar", nullable: true })
  mrange: string;

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
