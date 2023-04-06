import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class DeleteProductDto {
  @IsString()
  readonly id: string;
}
