import { ApiProperty } from "@nestjs/swagger";
import {
  ConnectionArgs,
  PaginationArgs,
} from "src/common/paginate/connection-paging";
import { OrderBySettingDto } from "./orderby-setting.dto";
import { WhereSettingDto } from "./where-setting.dto";
export class PagingSettingArgs extends ConnectionArgs {
  @ApiProperty({ description: "查询条件" })
  where: WhereSettingDto;

  @ApiProperty({ description: "排序条件" })
  orderBy?: OrderBySettingDto;

  @ApiProperty({ description: "页码，每页个数" })
  pagination: PaginationArgs;
}
