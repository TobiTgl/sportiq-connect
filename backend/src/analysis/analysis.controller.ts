import { Controller, Get, Inject, Query, Req, UseGuards } from '@nestjs/common';
import { DecodedIdToken } from 'firebase-admin/auth';
import { StravaAccessGuard } from 'src/analysis/stravaAccess.gard';
import { AuthGuard } from 'src/auth/auth.gard';
import { ANALYSIS_SERVICE_URL } from './analysis.pb';
import { AnalysisService } from './analysis.service';

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

  @Get('activities')
  @UseGuards(StravaAccessGuard)
  getActivities(@Query() queryParams: any, @Req() req): Promise<Array<any>> {
    const user: DecodedIdToken = req.user;
    const stravaAccessToken = user?.stravaAccessToken;
    return this.service.getActivities(stravaAccessToken, queryParams);
  }
}
