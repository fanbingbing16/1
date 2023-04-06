import { ApiProperty } from "@nestjs/swagger";
import {
  ConnectionArgs,
  PaginationArgs,
} from "src/common/paginate/connection-paging";
import { OrderByLbsDto } from "./orderby-lbs.dto";
import { WhereLbsDto } from "./where-lbs.dto";
export class PagingLbsArgs extends ConnectionArgs {
  @ApiProperty({ description: "查询条件" })
  where: WhereLbsDto;

  @ApiProperty({ description: "排序条件" })
  orderBy?: OrderByLbsDto;

  @ApiProperty({ description: "页码，每页个数" })
  pagination: PaginationArgs;
}
