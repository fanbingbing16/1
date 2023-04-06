import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ description: "名称" })
  @IsString()
  readonly name: string;
}
