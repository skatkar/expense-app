import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  ParseIntPipe,
  ParseEnumPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ReportService } from './report.service';
import { data, ReportType, Data } from '../data';

@Controller({ path: 'report/:type', version: '1' })
@ApiTags('Report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  getAllIncomeReports(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return data.report.filter((report) => report.type === reportType);
  }

  @Post()
  createIncomeReport(): { status: number; message: string } {
    return { status: 200, message: 'Successfully added' };
  }

  @Get(':id')
  getAllIncomeReportById(): any {
    return {};
  }
}
