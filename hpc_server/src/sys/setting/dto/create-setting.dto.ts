import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class CreateSettingDto {
  @ApiProperty({ description: "key" })
  @IsString()
  readonly key: string;

  @ApiProperty({ description: "data" })
  @IsString()
  readonly data: string;
}
