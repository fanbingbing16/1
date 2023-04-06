import { ApiProperty } from "@nestjs/swagger";
import {
  ConnectionArgs,
  PaginationArgs,
} from "src/common/paginate/connection-paging";
import { OrderByLbCommDto } from "./orderby-lb-comm.dto";
import { WhereLbCommDto } from "./where-lb-comm.dto";
export class PagingLbCommArgs extends ConnectionArgs {
  @ApiProperty({ description: "查询条件" })
  where: WhereLbCommDto;

  @ApiProperty({ description: "排序条件" })
  orderBy?: OrderByLbCommDto;

  @ApiProperty({ description: "页码，每页个数" })
  pagination: PaginationArgs;
}
