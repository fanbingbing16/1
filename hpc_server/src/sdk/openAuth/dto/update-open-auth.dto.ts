import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class UpdateOpenAuthDto {
  @IsString()
  readonly id: string;

  @IsString()
  readonly openid: string;
}
