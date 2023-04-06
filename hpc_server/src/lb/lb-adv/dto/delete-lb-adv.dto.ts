import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class DeleteLbAdvDto {
  @IsInt()
  readonly id: number;
}
