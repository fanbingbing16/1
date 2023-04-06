import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class DeleteLbCommDto {
  @IsInt()
  readonly id: number;
}
