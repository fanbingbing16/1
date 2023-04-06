import { Test } from "@nestjs/testing";
import { LbAdvController } from "./lb-adv.controller";
import { LbAdvService } from "./lb-adv.service";

describe("LbAdvsController", () => {
  let lbAdvController: LbAdvController;
  let lbAdvService: LbAdvService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [LbAdvController],
      providers: [LbAdvService],
    }).compile();

    lbAdvService = moduleRef.get<LbAdvService>(LbAdvService);
    lbAdvController = moduleRef.get<LbAdvController>(LbAdvController);
  });

  describe("findAll", () => {
    it("should return an array of lbAdv", async () => {
      const result: LbAdv[] = [
        {
          age: 2,
          breed: "Bombay",
          name: "Pixel",
        },
      ];
      jest.spyOn(lbAdvService, "findAll").mockImplementation(() => result);

      expect(await lbAdvController.findAll()).toBe(result);
    });
  });
});
