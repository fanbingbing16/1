import { ApiProperty } from "@nestjs/swagger";
import {
  ConnectionArgs,
  PaginationArgs,
} from "src/common/paginate/connection-paging";
import { OrderByUserItemDto } from "./orderby-user-item.dto";
import { WhereUserItemDto } from "./where-user-item.dto";
export class PagingUserItemArgs extends ConnectionArgs {
  @ApiProperty({ description: "查询条件" })
  where: WhereUserItemDto;

  @ApiProperty({ description: "排序条件" })
  orderBy?: OrderByUserItemDto;

  @ApiProperty({ description: "页码，每页个数" })
  pagination: PaginationArgs;
}
