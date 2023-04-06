import { Test } from "@nestjs/testing";
import { UserChildrensController } from "./user-children.controller";
import { UserChildrensService } from "./user-children.service";
import { UserChildren } from "./interfaces/user-children.interface";

describe("UserChildrensController", () => {
  let userChildrenController: UserChildrensController;
  let userChildrenService: UserChildrensService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserChildrensController],
      providers: [UserChildrensService],
    }).compile();

    userChildrenService = moduleRef.get<UserChildrensService>(UserChildrensService);
    userChildrenController = moduleRef.get<UserChildrensController>(UserChildrensController);
  });

  describe("findAll", () => {
    it("should return an array of userChildren", async () => {
      const result: UserChildren[] = [
        {
          age: 2,
          breed: "Bombay",
          name: "Pixel",
        },
      ];
      jest.spyOn(userChildrenService, "findAll").mockImplementation(() => result);

      expect(await userChildrenController.findAll()).toBe(result);
    });
  });
});
