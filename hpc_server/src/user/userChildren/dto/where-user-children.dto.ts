import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";
export class WhereUserChildrenDto {
  @ApiProperty({ description: "名称" })
  @IsString()
  readonly name_eq?: string;

  @ApiProperty({ description: "性别" })
  @IsString()
  readonly gender_eq?: string;
  
}
