import { MinLength, MaxLength, IsString, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SignupInput {
  @ApiProperty({ description: "用户名" })
  @IsString()
  @MaxLength(256)
  username: string;

  @ApiProperty({ description: "密码" })
  @IsString()
  @MaxLength(256)
  password: string;

  @ApiProperty({ description: "手机号" })
  @MaxLength(11)
  @IsOptional()
  mobile?: string;

  // @ApiProperty({ type: "String", name: "验证码" })
  // @MaxLength(6)
  // captcha: string;
}
