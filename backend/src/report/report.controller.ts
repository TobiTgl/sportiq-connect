import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { DecodedIdToken } from 'firebase-admin/auth';
import { AuthGuard } from 'src/gards/auth.gard';
import { StravaAccessGuard } from 'src/gards/stravaAccess.gard';
import { DataFrame, REPORT_SERVICE_URL } from './report.pb';
import { ReportService } from './report.service';

@Controller(REPORT_SERVICE_URL)
@UseGuards(AuthGuard)
export class ReportController {
  @Inject(ReportService)
  private readonly service: ReportService;

  @Get()
  hello(@Req() req): Promise<string> {
    const user: DecodedIdToken = req.user;
    const userId = user?.uid;
    const tenantId = user?.tenant;
    return this.service.hello(userId, tenantId);
  }

  @Get('create')
  @UseGuards(StravaAccessGuard)
  createReport(@Query() queryParams: any, @Req() req): Promise<DataFrame> {
    const user: DecodedIdToken = req.user;
    const stravaAccessToken = user?.stravaAccessToken;
    return this.service.createReport(stravaAccessToken, queryParams);
  }

  @Post('save')
  saveReport(@Req() req, @Body() body): Promise<boolean> {
    const user: DecodedIdToken = req.user;
    const userId = user.uid;
    const username = user.name;
    const tennant = user.tenant;
    const dataframe: DataFrame = body.dataframe;

    return this.service.saveReport(userId, username, tennant, dataframe);
  }

  @Get('getAll')
  getAllReports(@Req() req): Promise<any[]> {
    const user: DecodedIdToken = req.user;
    const tenant = user.tenant;
    return this.service.getAllReport(tenant);
  }
}
