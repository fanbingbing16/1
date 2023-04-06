import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { LbAdvController } from "./lb-adv.controller";
import { LbAdvRepository } from "./lb-adv.repository";
import { LbAdvService } from "./lb-adv.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([LbAdvRepository]),
    forwardRef(() => AuthModule),
  ],
  controllers: [LbAdvController],
  providers: [LbAdvService],
  exports: [LbAdvService],
})
export class LbAdvsModule {}
