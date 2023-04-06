import { createParamDecorator, ExecutionContext, SetMetadata } from "@nestjs/common";

//参数装饰器: 从ctx里面获取 User
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req?.jwt?.user;
  }
);


// //参数装饰器: 从ctx里面获取 User
// export const CurrentUser2 = createParamDecorator(
//   (data: unknown, ctx: ExecutionContext) => {
    
    
//     // // const req = ctx.switchToHttp().getRequest();
//     // // return req.user;

//     SetMetadata("jwt", data);
//     const whiteUrl =  reflector.get<string[]>(
//       "whiteurl",
//       context.getHandler()
//     );
//   }
// );

