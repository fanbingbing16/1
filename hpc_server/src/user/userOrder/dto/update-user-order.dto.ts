import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class UpdateUserOrderDto {
  @IsString()
  readonly id: string;
}
