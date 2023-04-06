import { Injectable } from "@nestjs/common";
import { PaginationArgs } from "src/common/paginate/connection-paging";
import { BaseCRUDService } from "src/common/service/crud/base.service";
import { resolveArrField, resolveField } from "src/common/utils/utils";
import { Lbs } from "src/lb/lb-info/entity/lb.entity";
import { getRepository } from "typeorm";
import { Category } from "../category/category.entity";
import { Product } from "./product.entity";
import { ProductRepository } from "./product.repository";

@Injectable()
export class ProductsService extends BaseCRUDService<Product> {
  constructor(private productRepository: ProductRepository) {
    super(productRepository);
  }
  /**
   *  查询所有商品
   * @param where
   * @param pagination
   * @param orderBy
   */
  async findAll(
    where: any,
    pagination: PaginationArgs,
    orderBy: any
  ): Promise<any> {
    const products = await this.findAndPaginate(where, pagination, orderBy);
    products.edges = await resolveField(products.edges, [
      {
        selectId: "itemId",
        setfield: "item",
        selectEntityfield: "id",
        selectEntity: Lbs,
      },
    ]);
    products.edges = await resolveArrField(products.edges, [
      {
        selectId: "categoryIds",
        setfield: "category",
        selectEntityfield: "id",
        selectEntity: Category,
      },
    ]);
    return products;
  }

  async findOneById(id: string): Promise<any> {
    let product = await this.findById(id);
    if (product) {
      product = await resolveField(product, [
        {
          selectId: "itemId",
          setfield: "item",
          selectEntityfield: "id",
          selectEntity: Lbs,
        },
      ]);
    }
    if (product) {
      product = await resolveArrField(product, [
        {
          selectId: "categoryIds",
          setfield: "category",
          selectEntityfield: "id",
          selectEntity: Category,
        },
      ]);
    }
    return product;
  }
}
