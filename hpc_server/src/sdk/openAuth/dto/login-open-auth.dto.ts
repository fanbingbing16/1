import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsInt, IsString } from "class-validator";

export class LoginOpenAuthDto {
  @ApiProperty({ description: "sdkid" })
  @IsString()
  readonly sdkid: string;

  @ApiProperty({
    description:
      "平台登录参数: 若skid 1,params: [openid, openkey];若skid 2,params: [code]",
  })
  @IsArray()
  readonly params: string[];
}
