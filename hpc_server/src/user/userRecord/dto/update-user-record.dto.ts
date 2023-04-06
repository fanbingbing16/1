import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";
import { collectJson } from "../interfaces/user-record.interface";

export class UpdateUserRecordDto {
  @IsString()
  @IsNotEmpty()
  readonly id: string;

  @ApiProperty({ nullable: true, description: "采集json" })
  readonly collectJson: collectJson;

  @ApiProperty({ nullable: true, description: "采集报告" })
  readonly collectReport?: string;

  // @ApiProperty({ nullable: true, description: "状态" })
  // readonly status: string;

  @ApiProperty({ nullable: true, description: "备注" })
  readonly remarks?: string;
}
