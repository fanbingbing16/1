import { IsOptional, IsString, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class weixinDto {
  @ApiProperty({ description: "用户名" })
  @IsString()
  @MaxLength(256)
  account: string;

  @ApiProperty({ description: "密码" })
  @IsString()
  @MaxLength(256)
  password: string;
}
