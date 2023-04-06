import { UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, MaxLength } from "class-validator";
import { Auth } from "src/common/decorators/http/auth.decorator";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
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

@Entity("sdk_gm_login")
export class GmLogin extends BaseEntity {
  @ApiProperty({ description: "档案号" })
  @PrimaryColumn({ name: "id", type: "varchar" })
  id: string;

  @ApiProperty({ description: "用户名" })
  @Column({ name: "account", type: "varchar", width: 256, unique: true })
  account: string;

  @ApiProperty({ description: "密码" })
  @Column({ name: "password", type: "varchar", width: 256, select: false })
  password: string;

  @ApiProperty({ nullable: true, description: "appid" })
  @Column({
    name: "appid",
    type: "varchar",
    width: 256,
    nullable: true,
    default: "1",
  })
  appid: string;

  @ApiProperty({ nullable: true, description: "openid" })
  @Column({ name: "openid", type: "varchar", width: 256, nullable: true })
  openid: string;

  @ApiProperty({ nullable: true, description: "openkey" })
  @Column({ name: "openkey", type: "varchar", width: 6, nullable: true })
  openkey: string;

  @ApiProperty({ nullable: true, description: "绑定手机号" })
  @Column({
    name: "phone",
    type: "varchar",
    width: 256,
    nullable: true,
  })
  phone: string;

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
    this.openid = generateFlakeID();
  }
}
