import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class WhereLbCommDto {
  @ApiProperty({ description: "lbid查询" })
  @IsString()
  readonly lbid_eq?: string;
}
