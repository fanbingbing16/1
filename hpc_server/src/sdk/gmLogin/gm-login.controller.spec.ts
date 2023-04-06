import { Test } from "@nestjs/testing";
import { GmLoginsController } from "./gm-login.controller";
import { GmLoginsService } from "./gm-login.service";
import { GmLogin } from "./interfaces/gm-login.interface";

describe("GmLoginsController", () => {
  let gmLoginController: GmLoginsController;
  let gmLoginService: GmLoginsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [GmLoginsController],
      providers: [GmLoginsService],
    }).compile();

    gmLoginService = moduleRef.get<GmLoginsService>(GmLoginsService);
    gmLoginController = moduleRef.get<GmLoginsController>(GmLoginsController);
  });

  describe("findAll", () => {
    it("should return an array of gmLogin", async () => {
      const result: GmLogin[] = [
        {
          age: 2,
          breed: "Bombay",
          name: "Pixel",
        },
      ];
      jest.spyOn(gmLoginService, "findAll").mockImplementation(() => result);

      expect(await gmLoginController.findAll()).toBe(result);
    });
  });
});
