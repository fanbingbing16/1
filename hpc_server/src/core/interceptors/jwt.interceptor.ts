import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import * as dayjs from "dayjs";
import passport from "passport";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class JwtInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private authService: AuthService
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    return next.handle().pipe(
      tap(async (value) => {
        const req = context.switchToHttp().getRequest();
        if (req.jwt) {
          const { user, token } = req.jwt;
          if (token) {
            // 验证token是否需要续签
            const nowTime = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
            const jwtTime = dayjs(token.exp * 1000).format(
              "YYYY-MM-DD HH:mm:ss"
            );
            if (dayjs(jwtTime).diff(nowTime, "day") < 2) {
              const { user: userInfo, ...jwtInfo } =
                await this.authService.generatePassport(user, {
                  openAuthId: token.openAuthId,
                });
              value.global = value.global || {};
              value.global.jwt = jwtInfo;
              value.global.user = userInfo;
            }
          }
        }
        // const whiteUrl = this.reflector.get<string[]>(
        //   "whiteurl",
        //   context.getHandler()
        // );

        // const whiteUrl = this.reflector.get<string[]>(
        //   "whiteurl",
        //   context.getHandler()
        // );
        console.log(`After... ${Date.now() - now}ms${req.jwt}`);
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
