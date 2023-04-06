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
@Entity("sys_setting")
export class Setting extends BaseEntity {
  @ApiProperty({ description: "ID" })
  @PrimaryColumn({ type: "varchar", name: "id" })
  id: string;

  @ApiProperty({ description: "key", nullable: true })
  @Column({
    name: "key",
    type: "varchar",
    unique: true,
  })
  key: string;

  @ApiProperty({ description: "data" })
  @Column({ name: "data", type: "json" })
  data: string;

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
