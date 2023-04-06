import { ApiProperty } from "@nestjs/swagger";
import {
  ConnectionArgs,
  PaginationArgs,
} from "src/common/paginate/connection-paging";
import { OrderByUserRecordDto } from "./orderby-user-record.dto";
import { WhereUserRecordDto } from "./where-user-record.dto";
export class PagingUserRecordArgs extends ConnectionArgs {
  @ApiProperty({ description: "查询条件" })
  where: WhereUserRecordDto;

  @ApiProperty({ description: "排序条件" })
  orderBy?: OrderByUserRecordDto;

  @ApiProperty({ description: "页码，每页个数" })
  pagination: PaginationArgs;
}
