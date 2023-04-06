import { Injectable } from "@nestjs/common";
import { PaginationArgs } from "src/common/paginate/connection-paging";
import { BaseCRUDService } from "src/common/service/crud/base.service";
import { resolveField } from "src/common/utils/utils";
import { Lbs } from "src/lb/lb-info/entity/lb.entity";
import { getRepository } from "typeorm";
import { CategoryRelation } from "./category-relation.entity";
import { CategoryRelationRepository } from "./category-relation.repository";

@Injectable()
export class CategoryRelationsService extends BaseCRUDService<CategoryRelation> {
  constructor(private categoryRelationRepository: CategoryRelationRepository) {
    super(categoryRelationRepository);
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
    const categoryRelations = await this.findAndPaginate(
      where,
      pagination,
      orderBy
    );
    return categoryRelations;
  }

  async findOneById(id: string): Promise<any> {
    const categoryRelation = await this.findById(id);
    return categoryRelation;
  }

  /**
   * 编辑分类关系最找
   * @param cartegoryId
   * @param subId
   * @returns
   */
  async editCategoryRelation(
    cartegoryIds: string[],
    subId: string
  ): Promise<any> {
    const hasRelation = await this.categoryRelationRepository.find({
      where: { subId },
    });
    const hasIds = hasRelation.map((v) => v.id);
    const delIds: string[] = [];
    const addRelations: {
      categoryId: string;
      subId: string;
    }[] = [];
    hasIds.forEach((v) => {
      if (cartegoryIds.indexOf(v) == -1) {
        delIds.push(v);
      }
    });
    cartegoryIds.forEach((v) => {
      if (hasIds.indexOf(v) == -1) {
        addRelations.push({
          categoryId: v,
          subId,
        });
      }
    });
    await this.categoryRelationRepository.delete(delIds);
    await this.categoryRelationRepository.insert(addRelations);
    return true;
  }
}
