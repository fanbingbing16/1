import { ApiProperty } from "@nestjs/swagger";
import { MaxLength } from "class-validator";
import { generateFlakeID } from "src/common/utils/flake";
import { UserItem } from "src/user/userItem/user-item.entity";
import { UserRecord } from "src/user/userRecord/user-record.entity";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { LbStatus, LbXfStatus } from "../lbs.enmu";

@Entity("lb_info")
export class Lbs extends BaseEntity {
  @ApiProperty({ description: "档案号" })
  @PrimaryColumn({ type: "varchar" })
  id: string;

  @ApiProperty({ description: "量表名称" })
  @Column({ name: "name", type: "varchar", width: 256 })
  name: string;

  @ApiProperty({ description: "量表适用人群", nullable: true })
  @Column({ name: "suitcrowd", type: "varchar", width: 256, nullable: true })
  suitcrowd: string;

  @ApiProperty({ description: "量表适用人群月龄", nullable: true })
  @Column({ name: "suitmonthage", type: "varchar", width: 256, nullable: true })
  suitmonthage: string;

  @ApiProperty({ description: "量表类型/前端使用", nullable: true })
  @Column({ name: "lb_type", type: "varchar", width: 256, nullable: true })
  lbType: string;

  @ApiProperty({ nullable: true, description: "项目key标识" })
  @Column({ name: "module", type: "varchar", width: 256, nullable: true })
  module: string;

  @ApiProperty({ nullable: true, description: "分类" })
  @Column({ name: "category_ids", type: "json", nullable: true })
  categoryIds: string;

  @ApiProperty({
    description: "量表报告类型/前端使用",
    nullable: true,
  })
  @Column({
    name: "lb_report_type",
    type: "varchar",
    width: 256,
    nullable: true,
  })
  lbReportType: string;

  @ApiProperty({
    nullable: true,
    description: "下发 0:禁用 -1:启用",
  })
  @Column({
    name: "is_issued",
    type: "enum",
    enum: LbXfStatus,
    default: LbXfStatus.DISABLE,
  })
  @MaxLength(1)
  isIssued: string;

  @ApiProperty({ description: "起始月龄", nullable: true })
  @Column({ name: "smonth", type: "varchar", width: 256, nullable: true })
  smonth: string;

  @ApiProperty({ description: "最晚月龄", nullable: true })
  @Column({ name: "emonth", type: "varchar", width: 256, nullable: true })
  emonth: string;

  @ApiProperty({ description: "量表简介", nullable: true })
  @Column({ name: "introductionRichText", type: "text", nullable: true })
  introductionRichText: string;

  @ApiProperty({ description: "量表介绍", nullable: true })
  @Column({ name: "introductionJson", type: "json", nullable: true })
  introductionJson: string;

  @ApiProperty({
    nullable: true,
    description: "状态 0:禁用 -1:启用",
  })
  @Column({
    name: "status",
    type: "enum",
    enum: LbStatus,
    default: LbStatus.DISABLE,
  })
  @MaxLength(1)
  status: number;

  @JoinColumn()
  userItem: UserItem[];

  @JoinColumn()
  userRecord: UserRecord[];

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
