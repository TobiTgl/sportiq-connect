import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { REPORT_SERVICE_URL } from './report.pb';
import { ReportService } from './report.service';
import { DecodedIdToken } from 'firebase-admin/auth';
import { AuthGuard } from 'src/auth/auth.gard';
import { StravaAccessGuard } from '../analysis/stravaAccess.gard';

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
  createReport(
    @Query() queryParams: any,
    @Req() req,
  ): Promise<{
    movingTimeData: any[];
    avgTotalElevationGain: number;
    avgMaxHeartRate: number;
    maxHeartRateData: any[];
    distanceData: any[];
    avgSpeed: number;
    avgHeartRateData: any[];
    avgDistance: number;
    typeSummary: any[];
    maxSpeedData: any[];
    avgSpeedData: any[];
    amountOfActivities: number;
    name: string;
    avgMaxSpeed: number;
    avgMovingTime: number;
    avgHeartRate: number;
    timestamp: number;
  }> {
    const user: DecodedIdToken = req.user;
    const stravaAccessToken = user?.stravaAccessToken;
    return this.service.createReport(stravaAccessToken, queryParams);
  }

  @Post('save')
  saveReport(@Req() req, @Body() body): Promise<boolean> {
    const user: DecodedIdToken = req.user;
    const userId = user.uid;
    return this.service.saveReport(userId, body);
  }
  @Get('getAll')
  getAllReports(@Req() req): Promise<any[]> {
    const user: DecodedIdToken = req.user;
    const userId = user.uid;
    return this.service.getAllReport(userId);
  }
  @Get(':id')
  getSingleReport(@Req() req, @Param() params: any): Promise<Object> {
    return this.service.getSingleReport(params.id);
  }
}
