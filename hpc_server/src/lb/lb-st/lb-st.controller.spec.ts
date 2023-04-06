import { Test } from "@nestjs/testing";
import { LbStController } from "./lb-st.controller";
import { LbStService } from "./lb-st.service";

describe("LbStsController", () => {
  let lbStController: LbStController;
  let lbStService: LbStService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [LbStController],
      providers: [LbStService],
    }).compile();

    lbStService = moduleRef.get<LbStService>(LbStService);
    lbStController = moduleRef.get<LbStController>(LbStController);
  });

  describe("findAll", () => {
    it("should return an array of lbSt", async () => {
      const result: LbSt[] = [
        {
          age: 2,
          breed: "Bombay",
          name: "Pixel",
        },
      ];
      jest.spyOn(lbStService, "findAll").mockImplementation(() => result);

      expect(await lbStController.findAll()).toBe(result);
    });
  });
});
