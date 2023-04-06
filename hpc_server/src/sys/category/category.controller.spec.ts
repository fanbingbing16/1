import { Test } from "@nestjs/testing";
import { CategorysController } from "./category.controller";
import { CategorysService } from "./category.service";
import { Category } from "./interfaces/category.interface";

describe("CategorysController", () => {
  let categoryController: CategorysController;
  let categoryService: CategorysService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CategorysController],
      providers: [CategorysService],
    }).compile();

    categoryService = moduleRef.get<CategorysService>(CategorysService);
    categoryController = moduleRef.get<CategorysController>(CategorysController);
  });

  describe("findAll", () => {
    it("should return an array of category", async () => {
      const result: Category[] = [
        {
          age: 2,
          breed: "Bombay",
          name: "Pixel",
        },
      ];
      jest.spyOn(categoryService, "findAll").mockImplementation(() => result);

      expect(await categoryController.findAll()).toBe(result);
    });
  });
});
