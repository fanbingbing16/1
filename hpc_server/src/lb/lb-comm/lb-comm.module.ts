import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { LbCommController } from "./lb-comm.controller";
import { LbCommRepository } from "./lb-comm.repository";
import { LbCommService } from "./lb-comm.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([LbCommRepository]),
    forwardRef(() => AuthModule),
  ],
  controllers: [LbCommController],
  providers: [LbCommService],
  exports: [LbCommService],
})
export class LbCommModule {}
