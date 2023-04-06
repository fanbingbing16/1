import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log("Before...");

    const now = Date.now();
    return next.handle().pipe(
      tap((value) => {
        const req = context.switchToHttp().getRequest();
        context.getHandler();
        // const whiteUrl = this.reflector.get<string[]>(
        //   "whiteurl",
        //   context.getHandler()
        // );

        // const whiteUrl = this.reflector.get<string[]>(
        //   "whiteurl",
        //   context.getHandler()
        // );
        console.log(`After... ${Date.now() - now}ms`);
      })
    );
  }
  // use(req: any, res: any, next: () => void) {
  //   // 拼接需要写入的内容
  //   const logFormat = `{method: ${req.method}, requestOriginalUrl: ${
  //     req.originalUrl
  //   }, query:${JSON.stringify(req.query)}, body:${JSON.stringify(
  //     req.body
  //   )}, params:${JSON.stringify(req.params)}, ip: ${req.ip}, statusCode: ${
  //     res.statusCode
  //   } }`;
  //   next();
  //   console.log("前端输入：", JSON.stringify(logFormat));
  // }
}
