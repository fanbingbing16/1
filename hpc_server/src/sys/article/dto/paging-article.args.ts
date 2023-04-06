import { ApiProperty } from "@nestjs/swagger";
import {
  ConnectionArgs,
  PaginationArgs,
} from "src/common/paginate/connection-paging";
import { OrderByArticleDto } from "./orderby-article.dto";
import { WhereArticleDto } from "./where-article.dto";
export class PagingArticleArgs extends ConnectionArgs {
  @ApiProperty({ description: "查询条件" })
  where: WhereArticleDto;

  @ApiProperty({ description: "排序条件" })
  orderBy?: OrderByArticleDto;

  @ApiProperty({ description: "页码，每页个数" })
  pagination: PaginationArgs;
}
