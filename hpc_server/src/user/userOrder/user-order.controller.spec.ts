import { Test } from "@nestjs/testing";
import { UserOrdersController } from "./user-order.controller";
import { UserOrder } from "./user-order.entity";
import { UserOrdersService } from "./user-order.service";

describe("UserOrdersController", () => {
  let userOrderController: UserOrdersController;
  let userOrderService: UserOrdersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserOrdersController],
      providers: [UserOrdersService],
    }).compile();

    userOrderService = moduleRef.get<UserOrdersService>(UserOrdersService);
    userOrderController =
      moduleRef.get<UserOrdersController>(UserOrdersController);
  });

  describe("findAll", () => {
    it("should return an array of userOrder", async () => {
      const result: UserOrder[] = [
        {
          age: 2,
          breed: "Bombay",
          name: "Pixel",
        },
      ];
      jest.spyOn(userOrderService, "findAll").mockImplementation(() => result);

      expect(await userOrderController.findAll()).toBe(result);
    });
  });
});
