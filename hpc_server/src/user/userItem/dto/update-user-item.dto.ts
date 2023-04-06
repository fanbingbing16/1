import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class UpdateUserItemDto {
  @IsString()
  readonly id: string;
}
