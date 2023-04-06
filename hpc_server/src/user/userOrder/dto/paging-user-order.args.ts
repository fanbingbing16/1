import { ApiProperty } from "@nestjs/swagger";
import {
  ConnectionArgs,
  PaginationArgs,
} from "src/common/paginate/connection-paging";
import { OrderByUserOrderDto } from "./orderby-user-order.dto";
import { WhereUserOrderDto } from "./where-user-order.dto";
export class PagingUserOrderArgs extends ConnectionArgs {
  @ApiProperty({ description: "查询条件" })
  where: WhereUserOrderDto;

  @ApiProperty({ description: "排序条件" })
  orderBy?: OrderByUserOrderDto;

  @ApiProperty({ description: "页码，每页个数" })
  pagination: PaginationArgs;
}
