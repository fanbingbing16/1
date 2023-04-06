import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class DeleteLbGsDto {
  @IsInt()
  readonly id: number;
}
