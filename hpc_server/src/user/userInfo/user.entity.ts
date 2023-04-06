import { ApiBearerAuth, ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, MaxLength } from "class-validator";
import { generateFlakeID } from "src/common/utils/flake";
import { Lbs } from "src/lb/lb-info/entity/lb.entity";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserBelong, UserStatus } from "./user.enmu";

@Entity("user_info")
export class User extends BaseEntity {
  @ApiProperty({ description: "ID" })
  @PrimaryColumn({ name: "id", type: "varchar" })
  id: string;

  @ApiProperty({ description: "角色", nullable: true })
  @Column({
    name: "roles",
    type: "json",
    // default: JSON.stringify(["user"]),
    nullable: true,
  })
  roles: string;

  // @ApiProperty({ description: "用户名" })
  // @Column({ name: "username", type: "varchar", width: 256, unique: true })
  // username: string;

  // @ApiProperty({ nullable: true, description: "密码" })
  // @Column({ name: "password", type: "varchar", width: 256, select: false })
  // password: string;

  @ApiProperty({ nullable: true, description: "名字" })
  @Column({ name: "name", type: "varchar", width: 256, nullable: true })
  name: string;

  @ApiProperty({ nullable: true, description: "微信昵称" })
  @Column({ name: "name_wx", type: "varchar", width: 256, nullable: true })
  nameWx: string;

  @ApiProperty({ nullable: true, description: "头像_微信" })
  @Column({
    name: "hand_wx",
    type: "varchar",
    width: 256,
    nullable: true,
  })
  handWx: string;

  @ApiProperty({ nullable: true, description: "头像" })
  @Column({
    name: "avatar",
    type: "varchar",
    width: 256,
    nullable: true,
  })
  hand: string;

  @ApiProperty({ nullable: true, description: "绑定手机号" })
  @Column({
    name: "mobile",
    type: "varchar",
    width: 256,
    nullable: true,
  })
  mobile: string;

  @ApiProperty({
    nullable: true,
    enum: UserStatus,
    description: "状态-1禁用0未激活1已激活",
  })
  @Column({ name: "status", type: "tinyint", nullable: true, default: 0 })
  @MaxLength(1)
  status: number;

  // @ApiProperty({
  //   nullable: true,
  //   description: "wx微信用户hospital医院用户school学校用户",
  //   enum: UserBelong,
  // })
  // @Column({
  //   name: "belong",
  //   type: "enum",
  //   enum: UserBelong,
  //   default: UserBelong.SYSTEM,
  // })
  // @MaxLength(1)
  // belong: number;

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
  }
}
