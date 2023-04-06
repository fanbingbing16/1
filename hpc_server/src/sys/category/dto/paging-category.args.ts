import { ApiProperty } from "@nestjs/swagger";
import {
  ConnectionArgs,
  PaginationArgs,
} from "src/common/paginate/connection-paging";
import { OrderByCategoryDto } from "./orderby-category.dto";
import { WhereCategoryDto } from "./where-category.dto";
export class PagingCategoryArgs extends ConnectionArgs {
  @ApiProperty({ description: "查询条件" })
  where: WhereCategoryDto;

  @ApiProperty({ description: "排序条件" })
  orderBy?: OrderByCategoryDto;

  @ApiProperty({ description: "页码，每页个数" })
  pagination: PaginationArgs;
}
