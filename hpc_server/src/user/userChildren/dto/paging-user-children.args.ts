import { ApiProperty } from "@nestjs/swagger";
import {
  ConnectionArgs,
  PaginationArgs,
} from "src/common/paginate/connection-paging";
import { OrderByUserChildrenDto } from "./orderby-user-children.dto";
import { WhereUserChildrenDto } from "./where-user-children.dto";
export class PagingUserChildrenArgs extends ConnectionArgs {
  @ApiProperty({ description: "查询条件" })
  where: WhereUserChildrenDto;

  @ApiProperty({ description: "排序条件" })
  orderBy?: OrderByUserChildrenDto;

  @ApiProperty({ description: "页码，每页个数" })
  pagination: PaginationArgs;
}
