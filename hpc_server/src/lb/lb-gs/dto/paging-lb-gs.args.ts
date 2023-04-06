import { ApiProperty } from "@nestjs/swagger";
import {
  ConnectionArgs,
  PaginationArgs,
} from "src/common/paginate/connection-paging";
import { OrderByLbGsDto } from "./orderby-lb-gs.dto";
import { WhereLbGsDto } from "./where-lb-gs.dto";
export class PagingLbGsArgs extends ConnectionArgs {
  @ApiProperty({ description: "查询条件" })
  where: WhereLbGsDto;

  @ApiProperty({ description: "排序条件" })
  orderBy?: OrderByLbGsDto;

  @ApiProperty({ description: "页码，每页个数" })
  pagination: PaginationArgs;
}
