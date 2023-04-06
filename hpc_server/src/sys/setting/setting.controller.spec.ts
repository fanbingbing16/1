import { Test } from "@nestjs/testing";
import { SettingsController } from "./setting.controller";
import { SettingsService } from "./setting.service";
import { Setting } from "./interfaces/setting.interface";

describe("SettingsController", () => {
  let settingController: SettingsController;
  let settingService: SettingsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [SettingsController],
      providers: [SettingsService],
    }).compile();

    settingService = moduleRef.get<SettingsService>(SettingsService);
    settingController = moduleRef.get<SettingsController>(SettingsController);
  });

  describe("findAll", () => {
    it("should return an array of setting", async () => {
      const result: Setting[] = [
        {
          age: 2,
          breed: "Bombay",
          name: "Pixel",
        },
      ];
      jest.spyOn(settingService, "findAll").mockImplementation(() => result);

      expect(await settingController.findAll()).toBe(result);
    });
  });
});
