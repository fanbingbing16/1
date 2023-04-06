import { ApiProperty } from "@nestjs/swagger";
import {
  ConnectionArgs,
  PaginationArgs,
} from "src/common/paginate/connection-paging";
import { OrderByOpenAuthDto } from "./orderby-open-auth.dto";
import { WhereOpenAuthDto } from "./where-open-auth.dto";
export class PagingOpenAuthArgs extends ConnectionArgs {
  @ApiProperty({ description: "查询条件" })
  where: WhereOpenAuthDto;

  @ApiProperty({ description: "排序条件" })
  orderBy?: OrderByOpenAuthDto;

  @ApiProperty({ description: "页码，每页个数" })
  pagination: PaginationArgs;
}
