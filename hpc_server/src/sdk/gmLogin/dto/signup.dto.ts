import { MinLength, MaxLength, IsString, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SignupDto {
  @ApiProperty({ description: "用户名" })
  @IsString()
  @MaxLength(256)
  account: string;

  @ApiProperty({ description: "密码" })
  @IsString()
  @MaxLength(256)
  password: string;

  @ApiProperty({ description: "手机号" })
  @MaxLength(11)
  @IsOptional()
  phone?: string;

  // @ApiProperty({ type: "String", name: "验证码" })
  // @MaxLength(6)
  // captcha: string;
}
