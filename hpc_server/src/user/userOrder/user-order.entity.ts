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
import { PaymenStatus } from "./user-order.enmu";

@Entity("user_order")
export class UserOrder extends BaseEntity {
  @ApiProperty({ description: "ID" })
  @PrimaryColumn({ name: "id", type: "varchar" })
  id: string;

  @ApiProperty({ description: "用户id", nullable: true })
  @Column({
    name: "user_id",
    type: "varchar",
    // default: JSON.stringify(["userOrder"]),
    width: 256,
    nullable: true,
  })
  userId: string;

  @ApiProperty({ description: "sdkid", nullable: true })
  @Column({
    name: "sdk_id",
    type: "varchar",
    // default: JSON.stringify(["userOrder"]),
    width: 256,
    nullable: true,
  })
  sdkId: string;

  // @ApiProperty({ description: "用户名" })
  // @Column({ name: "userOrdername", type: "varchar", width: 256, unique: true })
  // userOrdername: string;

  // @ApiProperty({ nullable: true, description: "密码" })
  // @Column({ name: "password", type: "varchar", width: 256, select: false })
  // password: string;

  @ApiProperty({
    nullable: true,
    description: "开发上订单ID 联合自增ID+时间戳 生成的唯一ID",
  })
  @Column({ name: "cp_order_id", type: "varchar", width: 256, nullable: true })
  cpOrderId: string;

  @ApiProperty({ nullable: true, description: "平台订单ID 用来对账" })
  @Column({ name: "pt_order_id", type: "varchar", width: 256, nullable: true })
  ptOrderId: string;

  @ApiProperty({ nullable: true, description: "购买数量" })
  @Column({ name: "count", type: "int", width: 11, nullable: true })
  count: number;

  @ApiProperty({ nullable: true, description: "订单金额" })
  @Column({ name: "price", type: "float", width: 11, nullable: true })
  price: number;

  @ApiProperty({ nullable: true, description: "币种 CNY" })
  @Column({
    name: "pcy",
    type: "varchar",
    width: 10,
    nullable: true,
    default: 1,
  })
  pcy: string;

  @ApiProperty({ nullable: true, description: "购买信息" })
  @Column({
    name: "params",
    type: "json",
    nullable: true,
  })
  params: string;

  @ApiProperty({ nullable: true, description: "支付状态" })
  @Column({
    name: "status",
    type: "enum",
    enum: PaymenStatus,
    nullable: true,
    default: PaymenStatus.PENGDING,
  })
  status: number;

  @ApiProperty({ nullable: true, description: "下单时间" })
  @CreateDateColumn({ name: "created_at", type: "datetime", nullable: true })
  createdAt: Date;

  @ApiProperty({ nullable: true, description: "支付时间" })
  @Column({ name: "payment_at", type: "datetime", nullable: true })
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
    this.cpOrderId = generateFlakeID();
  }
}
