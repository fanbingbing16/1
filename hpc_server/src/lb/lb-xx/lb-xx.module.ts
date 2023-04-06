import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { LbXxController } from "./lb-xx.controller";
import { LbXxRepository } from "./lb-xx.repository";
import { LbXxService } from "./lb-xx.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([LbXxRepository]),
    forwardRef(() => AuthModule),
  ],
  controllers: [LbXxController],
  providers: [LbXxService],
  exports: [LbXxService],
})
export class LbXxModule {}
