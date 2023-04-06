import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class UpdateUserDto {
  @IsString()
  readonly id: string;

  @ApiProperty({ nullable: true, description: "微信昵称" })
  @IsString()
  readonly nameWx: string;

  @ApiProperty({ nullable: true, description: "头像_微信" })
  @IsString()
  readonly handWx: string;

  @ApiProperty({ nullable: true, description: "头像" })
  @IsString()
  readonly hand: string;

  @ApiProperty({ nullable: true, description: "绑定手机号" })
  @IsString()
  readonly mobile: string;
}
