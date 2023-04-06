import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class CreateGmLoginDto {
  @ApiProperty({ description: "id" })
  @IsString()
  readonly id: string;
  @ApiProperty({ description: "用户名" })
  @IsString()
  readonly account: string;
  @ApiProperty({ description: "密码" })
  @IsString()
  readonly password: string;
}
