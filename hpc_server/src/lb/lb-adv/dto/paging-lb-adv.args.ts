import { ApiProperty } from "@nestjs/swagger";
import {
  ConnectionArgs,
  PaginationArgs,
} from "src/common/paginate/connection-paging";
import { OrderByLbAdvDto } from "./orderby-lb-adv.dto";
import { WhereLbAdvDto } from "./where-lb-adv.dto";
export class PagingLbAdvArgs extends ConnectionArgs {
  @ApiProperty({ description: "查询条件" })
  where: WhereLbAdvDto;

  @ApiProperty({ description: "排序条件" })
  orderBy?: OrderByLbAdvDto;

  @ApiProperty({ description: "页码，每页个数" })
  pagination: PaginationArgs;
}
