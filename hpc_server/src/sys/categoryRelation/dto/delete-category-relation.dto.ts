import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class DeleteCategoryRelationDto {
  @IsString()
  readonly id: string;
}
