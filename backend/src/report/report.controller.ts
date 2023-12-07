import { Controller, Get, Inject } from '@nestjs/common';
import { REPORT_SERVICE_URL } from './report.pb';
import { ReportService } from './report.service';

@Controller(REPORT_SERVICE_URL)
export class ReportController {
  @Inject(ReportService)
  private readonly service: ReportService;

  @Get()
  hello(): Promise<String> {
    return this.service.hello();
  }
}
