import { ApiProperty } from "@nestjs/swagger";
import {
  ConnectionArgs,
  PaginationArgs,
} from "src/common/paginate/connection-paging";
import { OrderByLbXxDto } from "./orderby-lb-xx.dto";
import { WhereLbXxDto } from "./where-lb-xx.dto";
export class PagingLbXxArgs extends ConnectionArgs {
  @ApiProperty({ description: "查询条件" })
  where: WhereLbXxDto;

  @ApiProperty({ description: "排序条件" })
  orderBy?: OrderByLbXxDto;

  @ApiProperty({ description: "页码，每页个数" })
  pagination: PaginationArgs;
}
