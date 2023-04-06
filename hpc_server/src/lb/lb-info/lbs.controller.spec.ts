import { Test } from "@nestjs/testing";
import { LbsController } from "./lbs.controller";
import { LbsService } from "./lbs.service";
import { Lbs } from "./interfaces/lbs.interface";

describe("LbssController", () => {
  let lbsController: LbsController;
  let lbsService: LbsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [LbsController],
      providers: [LbsService],
    }).compile();

    lbsService = moduleRef.get<LbsService>(LbsService);
    lbsController = moduleRef.get<LbsController>(LbsController);
  });

  describe("findAll", () => {
    it("should return an array of lbs", async () => {
      const result: Lbs[] = [
        {
          age: 2,
          breed: "Bombay",
          name: "Pixel",
        },
      ];
      jest.spyOn(lbsService, "findAll").mockImplementation(() => result);

      expect(await lbsController.findAll()).toBe(result);
    });
  });
});
