import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class UpdateSettingDto {
  @IsString()
  readonly id: string;

  @ApiProperty({ description: "key" })
  @IsString()
  readonly key: string;

  @ApiProperty({ description: "data" })
  @IsString()
  readonly data: string;
}
