import { Test } from "@nestjs/testing";
import { CategoryRelationsController } from "./category-relation.controller";
import { CategoryRelationsService } from "./category-relation.service";

describe("CategoryRelationsController", () => {
  let categoryRelationController: CategoryRelationsController;
  let categoryRelationService: CategoryRelationsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CategoryRelationsController],
      providers: [CategoryRelationsService],
    }).compile();

    categoryRelationService = moduleRef.get<CategoryRelationsService>(
      CategoryRelationsService
    );
    categoryRelationController = moduleRef.get<CategoryRelationsController>(
      CategoryRelationsController
    );
  });

  describe("findAll", () => {
    it("should return an array of categoryRelation", async () => {
      const result: CategoryRelation[] = [
        {
          age: 2,
          breed: "Bombay",
          name: "Pixel",
        },
      ];
      jest
        .spyOn(categoryRelationService, "findAll")
        .mockImplementation(() => result);

      expect(await categoryRelationController.findAll()).toBe(result);
    });
  });
});
