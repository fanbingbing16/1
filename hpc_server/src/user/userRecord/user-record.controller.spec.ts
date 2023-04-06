import { Test } from "@nestjs/testing";
import { UserRecordsController } from "./user-record.controller";
import { UserRecordsService } from "./user-record.service";
import { UserRecord } from "./interfaces/user-record.interface";

describe("UserRecordsController", () => {
  let userRecordController: UserRecordsController;
  let userRecordService: UserRecordsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserRecordsController],
      providers: [UserRecordsService],
    }).compile();

    userRecordService = moduleRef.get<UserRecordsService>(UserRecordsService);
    userRecordController = moduleRef.get<UserRecordsController>(UserRecordsController);
  });

  describe("findAll", () => {
    it("should return an array of userRecord", async () => {
      const result: UserRecord[] = [
        {
          age: 2,
          breed: "Bombay",
          name: "Pixel",
        },
      ];
      jest.spyOn(userRecordService, "findAll").mockImplementation(() => result);

      expect(await userRecordController.findAll()).toBe(result);
    });
  });
});
