import { Test } from "@nestjs/testing";
import { UserItemsController } from "./user-item.controller";
import { UserItemsService } from "./user-item.service";
import { UserItem } from "./interfaces/user-item.interface";

describe("UserItemsController", () => {
  let userItemController: UserItemsController;
  let userItemService: UserItemsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserItemsController],
      providers: [UserItemsService],
    }).compile();

    userItemService = moduleRef.get<UserItemsService>(UserItemsService);
    userItemController = moduleRef.get<UserItemsController>(UserItemsController);
  });

  describe("findAll", () => {
    it("should return an array of userItem", async () => {
      const result: UserItem[] = [
        {
          age: 2,
          breed: "Bombay",
          name: "Pixel",
        },
      ];
      jest.spyOn(userItemService, "findAll").mockImplementation(() => result);

      expect(await userItemController.findAll()).toBe(result);
    });
  });
});
