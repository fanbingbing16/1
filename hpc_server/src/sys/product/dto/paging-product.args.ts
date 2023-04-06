import { ApiProperty } from "@nestjs/swagger";
import {
  ConnectionArgs,
  PaginationArgs,
} from "src/common/paginate/connection-paging";
import { OrderByProductDto } from "./orderby-product.dto";
import { WhereProductDto } from "./where-product.dto";
export class PagingProductArgs extends ConnectionArgs {
  @ApiProperty({ description: "查询条件" })
  where: WhereProductDto;

  @ApiProperty({ description: "排序条件" })
  orderBy?: OrderByProductDto;

  @ApiProperty({ description: "页码，每页个数" })
  pagination: PaginationArgs;
}
