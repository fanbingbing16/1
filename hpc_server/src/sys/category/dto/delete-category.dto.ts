import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class DeleteCategoryDto {
  @IsString()
  readonly id: string;
}
