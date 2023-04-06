import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { SettingsController } from "./setting.controller";
import { SettingRepository } from "./setting.repository";
import { SettingsService } from "./setting.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([SettingRepository]),
    forwardRef(() => AuthModule),
  ],
  controllers: [SettingsController],
  providers: [SettingsService],
  exports: [SettingsService],
})
export class SettingsModule {}
