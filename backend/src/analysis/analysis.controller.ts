import { Controller, Get, Inject, Req, UseGuards } from '@nestjs/common';
import { ANALYSIS_SERVICE_URL } from './analysis.pb';
import { AnalysisService } from './analysis.service';
import { DecodedIdToken } from 'firebase-admin/auth';
import { AuthGuard } from 'src/auth/auth.gard';

@Controller(ANALYSIS_SERVICE_URL)
@UseGuards(AuthGuard)
export class AnalysisController {
  @Inject(AnalysisService)
  private readonly service: AnalysisService;

  @Get()
  hello(@Req() req): Promise<String> {
    const user: DecodedIdToken = req.user;
    const userId = user?.uid;
    const tenantId = user?.tenant;
    return this.service.hello(userId, tenantId);
  }
}
