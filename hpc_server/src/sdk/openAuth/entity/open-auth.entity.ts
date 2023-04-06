import { ApiProperty } from "@nestjs/swagger";
import { generateFlakeID } from "src/common/utils/flake";
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryColumn,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity("sdk_open_auth")
export class OpenAuth extends BaseEntity {
  @ApiProperty({ description: "ID" })
  @PrimaryColumn({ name: "id", type: "varchar" })
  id: string;
  
  @ApiProperty({ description: "用户授权完绑定的自动注册用户的ID" })
  @Column({
    name: "user_id",
    type: "varchar",
    default: "0",
    width: 256,
    nullable: true,
  })
  userId: string;

  @ApiProperty({ description: "用户授权的appid" })
  @Column({ name: "sdk_id", type: "varchar", width: 256 })
  sdkId: string;

  @ApiProperty({ description: "用户授权的openid" })
  @Column({ name: "openid", type: "varchar", width: 256 })
  openid: string;

  @ApiProperty({ nullable: true, description: "平台授权信息" })
  @Column({ name: "tokens", type: "json", nullable: true })
  tokens: string;

  @ApiProperty({
    description: " //绑定手机号码 分组 // 手机号码 允许重复 来自sdkid 配置表",
  })
  @Column({ name: "phone_id", type: "varchar", width: 256, nullable: true })
  phoneid: string;

  @ApiProperty({
    description:
      " //绑定手机号码 //本账号 榜单的手机号 , 可能来自平台 也可能来自业务 //平台要求注册即给",
  })
  @Column({ name: "phone", type: "varchar", width: 256, nullable: true })
  phone: string;

  @ApiProperty({ description: "渠道ID" })
  @Column({ name: "channel_id", type: "varchar", width: 256, nullable: true })
  channelId: string;

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
