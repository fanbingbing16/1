import { ApiProperty } from "@nestjs/swagger";
import {
  ConnectionArgs,
  PaginationArgs,
} from "src/common/paginate/connection-paging";
import { OrderByLbStDto } from "./orderby-lb-st.dto";
import { WhereLbStDto } from "./where-lb-st.dto";
export class PagingLbStArgs extends ConnectionArgs {
  @ApiProperty({ description: "查询条件" })
  where: WhereLbStDto;

  @ApiProperty({ description: "排序条件" })
  orderBy?: OrderByLbStDto;

  @ApiProperty({ description: "页码，每页个数" })
  pagination: PaginationArgs;
}
