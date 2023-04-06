import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class DeleteLbStDto {
  @IsInt()
  readonly id: number;
}
