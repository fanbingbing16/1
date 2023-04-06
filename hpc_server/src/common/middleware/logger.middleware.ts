import { Injectable, NestMiddleware } from "@nestjs/common";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    // 拼接需要写入的内容
    const logFormat = `{method: ${req.method}, requestOriginalUrl: ${
      req.originalUrl
    }, query:${JSON.stringify(req.query)}, body:${JSON.stringify(
      req.body
    )}, params:${JSON.stringify(req.params)}, ip: ${req.ip}, statusCode: ${
      res.statusCode
    } }`;
    console.log("前端输入：", JSON.stringify(logFormat), new Date().toLocaleDateString());
    next();
  }
}
