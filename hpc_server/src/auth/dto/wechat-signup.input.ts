import { InputType, Int, Field } from "@nestjs/graphql";
import { IsOptional, MaxLength, Validate } from "class-validator";
import { JSONSchema } from "class-validator-jsonschema";

@InputType()
export class WechatSignupInput {
  @Field(() => String)
  @MaxLength(32)
  @JSONSchema({
    description: "输入要创建用户的identityId",
    title: "用户identityId",
  })
  identityId: string;

  @Field(() => String)
  @MaxLength(32)
  @JSONSchema({
    description: "输入要创建用户的手机号码",
    title: "用户手机号码",
  })
  mobile: string;

  @Field(() => String)
  @MaxLength(32)
  @JSONSchema({
    description: "输入验证码",
    title: "验证码",
  })
  captcha: string;
}
