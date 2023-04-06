import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class QueryDetailDto {
  @ApiProperty({ description: "量表id" })
  @IsString()
  readonly id: string;

  @ApiProperty({ description: "档案id" })
  // @IsString()
  readonly childrenId?: string;

  @ApiProperty({ description: "当前用户id" })
  // @IsString()
  readonly userId?: string;
}
