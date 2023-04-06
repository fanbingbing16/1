import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class CreateOpenAuthDto {
  @ApiProperty({ description: "名称" })
  @IsString()
  readonly userId: string;
}
