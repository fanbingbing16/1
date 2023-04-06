import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Req,
  Res,
  HttpStatus,
  UseGuards,
  Inject,
  Query,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("weixin callback")
@Controller({ path: "/wxpay" })
export class WeixinController {
  // constructor(
  // ) {}

  @Get("/pay")
  @ApiOperation({ summary: "支付完成接口 参数 未知" })
  async refresh(@Param() params: any, @Query() qeury: any) {
    return "";
  }
}
