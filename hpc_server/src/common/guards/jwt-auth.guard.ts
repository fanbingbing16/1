import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { IAuthService } from "src/auth/interfaces/auth.interface";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject("AUTH_SERVICE")
    private readonly authService: IAuthService
  ) {}

  //登录验证
  async canActivate(context: ExecutionContext): Promise<boolean> {
    //使用 http 框架的上下文
    const req = context.switchToHttp().getRequest();
    //获取 headers 参数
    const authHeader = req.headers.authorization as string;
    const whiteUrl = this.reflector.get<string[]>(
      "whiteurl",
      context.getClass()
    );
    if (!authHeader) {
      throw new BadRequestException("Authorization header not found.");
    }
    // "Bearer werwerwerwre"
    // //头部""Bearer" 和 token 分离
    const [type, token] = authHeader.split(" ");
    if (type !== "Bearer") {
      throw new BadRequestException(
        `Authentication type \'Bearer\' required. Found \'${type}\'`
      );
    }
    //对 token 解码验证 //TODO  哪里实现的? 框架方法?
    //吧整个 user 对象 托管给了前端?
    const jwt = await this.authService.validateToken(token);

    // context.getArgs().jwt = jwt

    req.jwt = jwt;
    if (!jwt.isValid) {
      throw new UnauthorizedException("Token not valid");
    }
    
    return true;
  }
}
