import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateUserRecordDto {
  @ApiProperty({ description: "测评人id" })
  @IsString()
  @IsNotEmpty()
  readonly childrenId: string;

  @ApiProperty({ description: "商品id" })
  @IsString()
  @IsNotEmpty()
  readonly productId: string;

  @ApiProperty({ nullable: true, description: "备注" })
  readonly remarks: string;
}
