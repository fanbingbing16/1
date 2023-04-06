import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { LbStController } from "./lb-st.controller";
import { LbStRepository } from "./lb-st.repository";
import { LbStService } from "./lb-st.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([LbStRepository]),
    forwardRef(() => AuthModule),
  ],
  controllers: [LbStController],
  providers: [LbStService],
  exports: [LbStService],
})
export class LbStModule {}
