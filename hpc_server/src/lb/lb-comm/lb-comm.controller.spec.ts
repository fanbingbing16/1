import { Test } from "@nestjs/testing";
import { LbCommController } from "./lb-comm.controller";
import { LbCommService } from "./lb-comm.service";

describe("LbCommsController", () => {
  let lbCommController: LbCommController;
  let lbCommService: LbCommService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [LbCommController],
      providers: [LbCommService],
    }).compile();

    lbCommService = moduleRef.get<LbCommService>(LbCommService);
    lbCommController = moduleRef.get<LbCommController>(LbCommController);
  });

  describe("findAll", () => {
    it("should return an array of lbComm", async () => {
      const result: LbComm[] = [
        {
          age: 2,
          breed: "Bombay",
          name: "Pixel",
        },
      ];
      jest.spyOn(lbCommService, "findAll").mockImplementation(() => result);

      expect(await lbCommController.findAll()).toBe(result);
    });
  });
});
