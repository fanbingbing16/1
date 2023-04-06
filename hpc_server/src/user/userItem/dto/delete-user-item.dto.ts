import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class DeleteUserItemDto {
  @IsString()
  readonly id: string;
}
