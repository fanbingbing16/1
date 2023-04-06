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

@Entity("user_children")
export class UserChildren extends BaseEntity {
  @ApiProperty({ description: "ID" })
  @PrimaryColumn({ name: "id", type: "varchar" })
  id: string;

  @ApiProperty({ description: "用户id", nullable: true })
  @Column({
    name: "user_id",
    type: "varchar",
    // default: JSON.stringify(["userChildren"]),
    width: 256,
    nullable: true,
  })
  userId: string;

  // @ApiProperty({ description: "用户名" })
  // @Column({ name: "userChildrenname", type: "varchar", width: 256, unique: true })
  // userChildrenname: string;

  // @ApiProperty({ nullable: true, description: "密码" })
  // @Column({ name: "password", type: "varchar", width: 256, select: false })
  // password: string;

  @ApiProperty({ nullable: true, description: "名字" })
  @Column({ name: "name", type: "varchar", width: 20, nullable: true })
  name: string;

  @ApiProperty({ nullable: true, description: "性别" })
  @Column({ name: "gender", type: "varchar", width: 1, nullable: true })
  gender: string;

  @ApiProperty({ nullable: true, description: "生日" })
  @Column({
    name: "birthday",
    type: "varchar",
    width: 50,
    nullable: true,
  })
  birthday: string;

  @ApiProperty({ nullable: true, description: "身高" })
  @Column({
    name: "height",
    type: "varchar",
    width: 10,
    nullable: true,
  })
  height: string;

  @ApiProperty({ nullable: true, description: "体重" })
  @Column({
    name: "weight",
    type: "varchar",
    width: 10,
    nullable: true,
  })
  weight: string;

  @ApiProperty({ nullable: true, description: "出生情况-孕几周" })
  @Column({ name: "birth_week", type: "varchar", width: 10, nullable: true })
  birthWeek: string;

  @ApiProperty({ nullable: true, description: "出生情况-孕周后剩余几天" })
  @Column({ name: "birth_day", type: "varchar", width: 10, nullable: true })
  birthDay: string;

  @ApiProperty({ nullable: true, description: "出生情况-出生身高cm" })
  @Column({ name: "birth_height", type: "varchar", width: 10, nullable: true })
  birthHeight: string;

  @ApiProperty({ nullable: true, description: "出生情况-出生体重kg" })
  @Column({ name: "birth_weight", type: "varchar", width: 10, nullable: true })
  birthWeight: string;

  @ApiProperty({ nullable: true, description: "出生情况-头围cm" })
  @Column({ name: "birth_head", type: "varchar", width: 10, nullable: true })
  birthHead: string;

  @ApiProperty({ nullable: true, description: "头围cm" })
  @Column({ name: "head", type: "varchar", width: 10, nullable: true })
  head: string;
  // @ApiProperty({
  //   nullable: true,
  //   enum: UserChildrenStatus,
  //   description: "状态-1禁用0未激活1已激活",
  // })
  // @Column({ name: "status", type: "tinyint", nullable: true, default: 0 })
  // @MaxLength(1)
  // status: number;

  // @ApiProperty({
  //   nullable: true,
  //   description: "wx微信用户hospital医院用户school学校用户",
  //   enum: UserChildrenBelong,
  // })
  // @Column({
  //   name: "belong",
  //   type: "enum",
  //   enum: UserChildrenBelong,
  //   default: UserChildrenBelong.SYSTEM,
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
