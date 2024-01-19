import { Controller, Get, Inject, Param, Req, Res, UseGuards } from '@nestjs/common';
import { REPORT_SERVICE_URL } from './report.pb';
import { ReportService } from './report.service';
import { DecodedIdToken } from 'firebase-admin/auth';
import { AuthGuard } from 'src/auth/auth.gard';

@Controller(REPORT_SERVICE_URL)
export class ReportController {
  @Inject(ReportService)
  private readonly service: ReportService;

  @Get()
  hello(@Req() req): Promise<String> {
    const user: DecodedIdToken = req.user;
    const userId = user?.uid;
    const tenantId = user?.tenant;
    return this.service.hello(userId, tenantId);
  }

  @Get('dailyreport')
  dailyreport(): Promise<String> {
    return this.service.dailyreport();
  }

  @Get('all')
    getAll(@Req() req): Promise<Array<Object>> {
    return this.service.getAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  getSingleReport(@Req() req, @Param() params: any): Promise<Object> {
    return this.service.getSingleReport(params.id);
  }
}
