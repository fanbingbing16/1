import { ApiProperty } from "@nestjs/swagger";
import {
  ConnectionArgs,
  PaginationArgs,
} from "src/common/paginate/connection-paging";
import { OrderByUserDto } from "./orderby-user.dto";
import { WhereUserDto } from "./where-user.dto";
export class PagingUserArgs extends ConnectionArgs {
  @ApiProperty({ description: "查询条件" })
  where: WhereUserDto;

  @ApiProperty({ description: "排序条件" })
  orderBy?: OrderByUserDto;

  @ApiProperty({ description: "页码，每页个数" })
  pagination: PaginationArgs;
}
