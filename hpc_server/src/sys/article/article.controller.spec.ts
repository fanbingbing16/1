import { Test } from "@nestjs/testing";
import { ArticlesController } from "./article.controller";
import { ArticlesService } from "./article.service";
import { Article } from "./interfaces/article.interface";

describe("ArticlesController", () => {
  let articleController: ArticlesController;
  let articleService: ArticlesService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ArticlesController],
      providers: [ArticlesService],
    }).compile();

    articleService = moduleRef.get<ArticlesService>(ArticlesService);
    articleController = moduleRef.get<ArticlesController>(ArticlesController);
  });

  describe("findAll", () => {
    it("should return an array of article", async () => {
      const result: Article[] = [
        {
          age: 2,
          breed: "Bombay",
          name: "Pixel",
        },
      ];
      jest.spyOn(articleService, "findAll").mockImplementation(() => result);

      expect(await articleController.findAll()).toBe(result);
    });
  });
});
