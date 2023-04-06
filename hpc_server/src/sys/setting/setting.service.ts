import { Injectable } from "@nestjs/common";
import { BaseCRUDService } from "src/common/service/crud/base.service";
import { Setting } from "./setting.entity";
import { SettingRepository } from "./setting.repository";

@Injectable()
export class SettingsService extends BaseCRUDService<Setting> {
  constructor(private settingRepository: SettingRepository) {
    super(settingRepository);
  }
}
