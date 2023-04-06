import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class UpdateLbXxDto {
  @IsInt()
  readonly id: number;
}
