import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class orderParamDto {
  @ApiProperty({ description: "商品id" })
  @IsNotEmpty()
  @IsString()
  readonly productId: string; //购买类型

  // @ApiProperty({ description: "kind 默认传1" })
  // @IsNotEmpty()
  // @IsString()
  // readonly kind: string; //购买类型

  // @ApiProperty({ description: "pid 目前先传量表id" })
  // @IsNotEmpty()
  // @IsString()
  // readonly pid: string; //子ID

  @ApiProperty({ description: "disId" })
  @IsString()
  readonly disId?: string; //打折卡ID
}

export class CreateUserOrderDto {
  // @ApiProperty({ description: "名称" })
  // @IsString()
  // readonly name: string;
  @ApiProperty({ description: "sdkId" })
  @IsNotEmpty()
  @IsString()
  readonly sdkId: string; //sdkId

  @ApiProperty({ description: "购买数量" })
  @IsInt()
  @IsNotEmpty()
  readonly count: number;

  @ApiProperty({ description: "购买信息" })
  @IsNotEmpty()
  readonly params: orderParamDto;
}
