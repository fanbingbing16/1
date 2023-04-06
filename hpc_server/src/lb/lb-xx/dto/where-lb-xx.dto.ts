import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class WhereLbXxDto {
  @ApiProperty({ description: "lbid查询" })
  @IsString()
  readonly lbid_eq?: string;

  @ApiProperty({ description: "stid查询" })
  @IsString()
  readonly stid_eq?: string;
}
