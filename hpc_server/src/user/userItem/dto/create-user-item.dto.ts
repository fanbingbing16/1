import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNumber, IsString } from "class-validator";

export class CreateUserItemDto {
  @ApiProperty({ description: "userId" })
  @IsString()
  readonly userId: string;

  @ApiProperty({ description: "productId" })
  @IsString()
  readonly productId: string;

  @ApiProperty({ description: "count" })
  @IsNumber()
  readonly count: number;
}
