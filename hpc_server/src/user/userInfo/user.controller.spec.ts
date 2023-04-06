import { Test } from "@nestjs/testing";
import { UsersController } from "./user.controller";
import { UsersService } from "./user.service";
import { User } from "./interfaces/user.interface";

describe("UsersController", () => {
  let userController: UsersController;
  let userService: UsersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    userService = moduleRef.get<UsersService>(UsersService);
    userController = moduleRef.get<UsersController>(UsersController);
  });

  describe("findAll", () => {
    it("should return an array of user", async () => {
      const result: User[] = [
        {
          age: 2,
          breed: "Bombay",
          name: "Pixel",
        },
      ];
      jest.spyOn(userService, "findAll").mockImplementation(() => result);

      expect(await userController.findAll()).toBe(result);
    });
  });
});
