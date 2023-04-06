import { ApiBearerAuth, ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, MaxLength } from "class-validator";
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
import { RecordStatus } from "./user-record.enmu";

@Entity("user_record")
export class UserRecord extends BaseEntity {
  @ApiProperty({ description: "ID" })
  @PrimaryColumn({ name: "id", type: "varchar" })
  id: string;

  @ApiProperty({ description: "用户id", nullable: true })
  @Column({
    name: "user_id",
    type: "varchar",
    // default: JSON.stringify(["userRecord"]),
    width: 256,
    nullable: true,
  })
  userId: string;

  @ApiProperty({ description: "家属id", nullable: true })
  @Column({
    name: "children_id",
    type: "varchar",
    // default: JSON.stringify(["userRecord"]),
    width: 256,
    nullable: true,
  })
  childrenId: string;

  @ApiProperty({ description: "商品id", nullable: true })
  @Column({
    name: "product_id",
    type: "varchar",
    // default: JSON.stringify(["userRecord"]),
    width: 256,
    nullable: true,
  })
  productId: string;

  @ApiProperty({ description: "量表id", nullable: true })
  @Column({
    name: "lbid",
    type: "varchar",
    // default: JSON.stringify(["userRecord"]),
    width: 256,
    nullable: true,
  })
  lbid: string;
  // @ApiProperty({ description: "用户名" })
  // @Column({ name: "userRecordname", type: "varchar", width: 256, unique: true })
  // userRecordname: string;

  // @ApiProperty({ nullable: true, description: "密码" })
  // @Column({ name: "password", type: "varchar", width: 256, select: false })
  // password: string;

  @ApiProperty({
    nullable: true,
    description: "采集时间",
  })
  @Column({ name: "collect_at", type: "varchar", width: 256, nullable: true })
  collectAt: string;

  @ApiProperty({ nullable: true, description: "采集json" })
  @Column({ name: "collect_json", type: "json", nullable: true })
  collectJson: string;

  @ApiProperty({ nullable: true, description: "采集报告" })
  @Column({ name: "collect_report", type: "blob", nullable: true })
  collectReport: string;

  @ApiProperty({ nullable: true, description: "状态" })
  @Column({
    name: "status",
    type: "enum",
    enum: RecordStatus,
    nullable: true,
    default: RecordStatus.PENGDING,
  })
  status: number;

  @ApiProperty({ nullable: true, description: "备注" })
  @Column({
    name: "remarks",
    type: "varchar",
    width: 256,
    nullable: true,
  })
  remarks: string;

  @ApiProperty({ nullable: true, description: "下单时间" })
  @CreateDateColumn({ name: "created_at", type: "datetime", nullable: true })
  createdAt: Date;

  @ApiProperty({ nullable: true, description: "支付时间" })
  @CreateDateColumn({ name: "payment_at", type: "datetime", nullable: true })
  paymentAt: Date;

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
