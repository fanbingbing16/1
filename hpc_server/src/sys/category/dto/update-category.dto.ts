import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class UpdateCategoryDto {
  @IsString()
  readonly id: string;
}
