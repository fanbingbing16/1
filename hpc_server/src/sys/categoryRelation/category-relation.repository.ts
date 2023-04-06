import { EntityRepository, Repository } from "typeorm";
import { CategoryRelation } from "./category-relation.entity";

@EntityRepository(CategoryRelation)
export class CategoryRelationRepository extends Repository<CategoryRelation> {}
