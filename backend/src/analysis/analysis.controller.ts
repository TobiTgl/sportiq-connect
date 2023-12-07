import { Controller, Get, Inject } from '@nestjs/common';
import { ANALYSIS_SERVICE_URL } from './analysis.pb';
import { AnalysisService } from './analysis.service';

@Controller(ANALYSIS_SERVICE_URL)
export class AnalysisController {
  @Inject(AnalysisService)
  private readonly service: AnalysisService;

  @Get()
  hello(): Promise<String> {
    return this.service.hello();
  }
}
