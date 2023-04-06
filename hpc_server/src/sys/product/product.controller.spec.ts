import { Test } from "@nestjs/testing";
import { ProductsController } from "./product.controller";
import { ProductsService } from "./product.service";
import { Product } from "./interfaces/product.interface";

describe("ProductsController", () => {
  let productController: ProductsController;
  let productService: ProductsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService],
    }).compile();

    productService = moduleRef.get<ProductsService>(ProductsService);
    productController = moduleRef.get<ProductsController>(ProductsController);
  });

  describe("findAll", () => {
    it("should return an array of product", async () => {
      const result: Product[] = [
        {
          age: 2,
          breed: "Bombay",
          name: "Pixel",
        },
      ];
      jest.spyOn(productService, "findAll").mockImplementation(() => result);

      expect(await productController.findAll()).toBe(result);
    });
  });
});
