import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class CreateLbsDto {

  @ApiProperty({ description: "名称" })
  readonly name: string;

  @ApiProperty({ description: "量表适用人群", nullable: true })
  readonly suitcrowd?: string;

  @ApiProperty({ description: "量表适用人群月龄", nullable: true })
  readonly suitmonthage?: string;

  @ApiProperty({ description: "量表类型/前端使用", nullable: true })
  readonly lbType?: string;

  @ApiProperty({ nullable: true, description: "项目key标识" })
  readonly module?: string;

  @ApiProperty({
    description: "量表报告类型/前端使用",
    nullable: true,
  })
  readonly lbReportType?: string;

  @ApiProperty({
    nullable: true,
    description: "下发 0:禁用 -1:启用",
  })
  readonly isIssued?: string;

  @ApiProperty({ description: "起始月龄", nullable: true })
  readonly smonth?: string;

  @ApiProperty({ description: "最晚月龄", nullable: true })
  readonly emonth?: string;

  @ApiProperty({ description: "量表简介", nullable: true })
  readonly introductionRichText?: string;

  @ApiProperty({ description: "量表介绍", nullable: true })
  readonly introductionJson?: string;

  @ApiProperty({ nullable: true, description: "分类" })
  categoryIds: any;
  
  @ApiProperty({
    nullable: true,
    description: "状态 0:禁用 -1:启用",
  })
  readonly status?: number;
}
