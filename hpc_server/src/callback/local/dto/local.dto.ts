import { IsOptional, IsString, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class localDto {
  @ApiProperty({ description: "用户名" }) 
  cpOrderId: string;
}
