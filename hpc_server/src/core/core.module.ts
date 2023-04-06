import { Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { AuthModule } from "src/auth/auth.module";
import { JwtInterceptor } from "./interceptors/jwt.interceptor";
import { LoggingInterceptor } from "./interceptors/logging.interceptor";
import { TransformInterceptor } from "./interceptors/transform.interceptor";

@Module({
  imports: [AuthModule],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    { provide: APP_INTERCEPTOR, useClass: JwtInterceptor },
  ],
})
export class CoreModule {}
