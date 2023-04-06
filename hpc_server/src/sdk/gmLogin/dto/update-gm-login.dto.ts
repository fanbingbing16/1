import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class UpdateGmLoginDto {
  @IsString()
  readonly id: string;
  @ApiProperty({ description: "名称" })
  @IsString()
  readonly account?: string;

  @ApiProperty({ description: "密码" })
  @IsString()
  readonly password?: string;
}
