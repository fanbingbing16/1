import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class DeleteOpenAuthDto {
  @IsInt()
  readonly id: number;
}
