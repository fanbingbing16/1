import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class DeleteUserDto {
  @IsString()
  readonly id: string;
}
