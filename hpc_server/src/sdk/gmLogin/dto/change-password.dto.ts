import { MinLength, MaxLength, IsString, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ChangePasswordDto {
  @ApiProperty({ description: "id" })
  @IsString()
  readonly id: string;

  @ApiProperty({ description: "原密码" })
  @IsString()
  @MaxLength(256)
  originalPassword: string;

  @ApiProperty({ description: "新密码" })
  @IsString()
  @MaxLength(256)
  password: string;

  // @ApiProperty({ type: "String", name: "验证码" })
  // @MaxLength(6)
  // captcha: string;
}
