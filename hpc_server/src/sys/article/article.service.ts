import { Injectable } from "@nestjs/common";
import { PaginationArgs } from "src/common/paginate/connection-paging";
import { BaseCRUDService } from "src/common/service/crud/base.service";
import { resolveArrField, resolveField } from "src/common/utils/utils";
import { Lbs } from "src/lb/lb-info/entity/lb.entity";
import { getRepository } from "typeorm";
import { Category } from "../category/category.entity";
import { CategorysService } from "../category/category.service";
import { Article } from "./article.entity";
import { ArticleRepository } from "./article.repository";

@Injectable()
export class ArticlesService extends BaseCRUDService<Article> {
  constructor(private articleRepository: ArticleRepository) {
    super(articleRepository);
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
    const articles = await this.findAndPaginate(where, pagination, orderBy);
    articles.edges = await resolveArrField(articles.edges, [
      {
        selectId: "categoryIds",
        setfield: "category",
        selectEntityfield: "id",
        selectEntity: Category,
      },
    ]);
    return articles;
  }

  async findOneById(id: string): Promise<any> {
    let article = await this.findById(id);
    if (article) {
      article.look += 1;
      await this.articleRepository.save(article);
    }
    if (article) {
      article = await resolveArrField(article, [
        {
          selectId: "categoryIds",
          setfield: "category",
          selectEntityfield: "id",
          selectEntity: Category,
        },
      ]);
    }
    return article;
  }

}
