import { Test } from "@nestjs/testing";
import { LbXxController } from "./lb-xx.controller";
import { LbXxService } from "./lb-xx.service";

describe("LbXxsController", () => {
  let lbXxController: LbXxController;
  let lbXxService: LbXxService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [LbXxController],
      providers: [LbXxService],
    }).compile();

    lbXxService = moduleRef.get<LbXxService>(LbXxService);
    lbXxController = moduleRef.get<LbXxController>(LbXxController);
  });

  describe("findAll", () => {
    it("should return an array of lbXx", async () => {
      const result: LbXx[] = [
        {
          age: 2,
          breed: "Bombay",
          name: "Pixel",
        },
      ];
      jest.spyOn(lbXxService, "findAll").mockImplementation(() => result);

      expect(await lbXxController.findAll()).toBe(result);
    });
  });
});
