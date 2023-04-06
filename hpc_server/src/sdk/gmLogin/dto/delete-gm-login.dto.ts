import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class DeleteGmLoginDto {
  @IsString()
  readonly id: string;
}
