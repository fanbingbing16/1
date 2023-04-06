import { ApiProperty } from "@nestjs/swagger";
import {
  ConnectionArgs,
  PaginationArgs,
} from "src/common/paginate/connection-paging";
import { OrderByCategoryRelationDto } from "./orderby-category-relation.dto";
import { WhereCategoryRelationDto } from "./where-category-relation.dto";
export class PagingCategoryRelationArgs extends ConnectionArgs {
  @ApiProperty({ description: "查询条件" })
  where: WhereCategoryRelationDto;

  @ApiProperty({ description: "排序条件" })
  orderBy?: OrderByCategoryRelationDto;

  @ApiProperty({ description: "页码，每页个数" })
  pagination: PaginationArgs;
}
