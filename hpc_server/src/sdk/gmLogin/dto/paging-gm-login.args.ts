import { ApiProperty } from "@nestjs/swagger";
import {
  ConnectionArgs,
  PaginationArgs,
} from "src/common/paginate/connection-paging";
import { OrderByGmLoginDto } from "./orderby-gm-login.dto";
import { WhereGmLoginDto } from "./where-gm-login.dto";
export class PagingGmLoginArgs extends ConnectionArgs {
  @ApiProperty({ description: "查询条件" })
  where: WhereGmLoginDto;

  @ApiProperty({ description: "排序条件" })
  orderBy?: OrderByGmLoginDto;

  @ApiProperty({ description: "页码，每页个数" })
  pagination: PaginationArgs;
}
