import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class UpdateLbStDto {
  @IsInt()
  readonly id: number;
}
