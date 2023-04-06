import { Injectable } from "@nestjs/common";
import { PaginationArgs } from "src/common/paginate/connection-paging";
import { BaseCRUDService } from "src/common/service/crud/base.service"; 
import { Category } from "./category.entity";
import { CategoryRepository } from "./category.repository";

@Injectable()
export class CategorysService extends BaseCRUDService<Category> {
  constructor(private categoryRepository: CategoryRepository) {
    super(categoryRepository);
  }
  /**
   *  查询所有用户道具
   * @param where
   * @param pagination
   * @param orderBy
   */
  async findAll(
    where: any,
    pagination: PaginationArgs,
    orderBy: any
  ): Promise<any> {
    const categorys = await this.findAndPaginate(where, pagination, orderBy);
    return categorys;
  }

  async findOneById(id: string): Promise<any> {
    const category = await this.findById(id);
    return category;
  }
}
