import { Test } from "@nestjs/testing";
import { OpenAuthController } from "./open-auth.controller";
import { OpenAuthService } from "./open-auth.service";
import { OpenAuth } from "./interfaces/open-auth.interface";

describe("OpenAuthsController", () => {
  let openAuthController: OpenAuthController;
  let openAuthService: OpenAuthService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [OpenAuthController],
      providers: [OpenAuthService],
    }).compile();

    openAuthService = moduleRef.get<OpenAuthService>(OpenAuthService);
    openAuthController = moduleRef.get<OpenAuthController>(OpenAuthController);
  });

  describe("findAll", () => {
    it("should return an array of openAuth", async () => {
      const result: OpenAuth[] = [
        {
          age: 2,
          breed: "Bombay",
          name: "Pixel",
        },
      ];
      jest.spyOn(openAuthService, "findAll").mockImplementation(() => result);

      expect(await openAuthController.findAll()).toBe(result);
    });
  });
});
