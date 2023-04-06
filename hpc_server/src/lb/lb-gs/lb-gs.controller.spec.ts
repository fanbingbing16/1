import { Test } from "@nestjs/testing";
import { LbGsController } from "./lb-gs.controller";
import { LbGsService } from "./lb-gs.service";

describe("LbGssController", () => {
  let lbGsController: LbGsController;
  let lbGsService: LbGsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [LbGsController],
      providers: [LbGsService],
    }).compile();

    lbGsService = moduleRef.get<LbGsService>(LbGsService);
    lbGsController = moduleRef.get<LbGsController>(LbGsController);
  });

  describe("findAll", () => {
    it("should return an array of lbGs", async () => {
      const result: LbGs[] = [
        {
          age: 2,
          breed: "Bombay",
          name: "Pixel",
        },
      ];
      jest.spyOn(lbGsService, "findAll").mockImplementation(() => result);

      expect(await lbGsController.findAll()).toBe(result);
    });
  });
});
