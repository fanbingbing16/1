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
import { Response } from "express";
import { localDto } from "./dto/local.dto";

@ApiTags("local callback")
@Controller({ path: "/local" })
export class LocalController {
  // constructor(
  // ) {}

  @Get("/pay")
  @ApiOperation({ summary: "支付完成接口 参数 未知" })
  async paySuccess(@Query() params: localDto, @Res() res: Response) {
    // res.status(HttpStatus.UNAUTHORIZED).send(error.toString());
    res.send("SUCCESS")
  }
}
