import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class UpdateLbGsDto {
  @IsInt()
  readonly id: number;
}
