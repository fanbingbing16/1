import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { LbGsController } from "./lb-gs.controller";
import { LbGsRepository } from "./lb-gs.repository";
import { LbGsService } from "./lb-gs.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([LbGsRepository]),
    forwardRef(() => AuthModule),
  ],
  controllers: [LbGsController],
  providers: [LbGsService],
  exports: [LbGsService],
})
export class LbGsModule {}
