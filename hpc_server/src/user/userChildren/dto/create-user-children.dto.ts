import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateUserChildrenDto {
  @ApiProperty({ description: "名称" })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: "性别 0女 1男" })
  @IsString()
  @IsNotEmpty()
  @MaxLength(1)
  readonly gender: string;

  @ApiProperty({ description: "生日" })
  @IsString()
  @IsNotEmpty()
  readonly birthday: string;

  @ApiProperty({ nullable: true, description: "身高" })
  readonly height?: string;

  @ApiProperty({ nullable: true, description: "体重" })
  readonly weight?: string;

  @ApiProperty({ nullable: true, description: "出生情况-孕几周" })
  readonly birthWeek?: string;

  @ApiProperty({ nullable: true, description: "出生情况-孕周后剩余几天" })
  readonly birthDay?: string;

  @ApiProperty({ nullable: true, description: "出生情况-出生身高cm" })
  readonly birthHeight?: string;

  @ApiProperty({ nullable: true, description: "出生情况-出生体重kg" })
  readonly birthWeight?: string;

  @ApiProperty({ nullable: true, description: "出生情况-头围cm" })
  readonly birthHead?: string;

  @ApiProperty({ nullable: true, description: "头围cm" })
  readonly head?: string;
}
