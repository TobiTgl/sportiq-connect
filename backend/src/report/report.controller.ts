import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
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
export class ReportController {
  @Inject(ReportService)
  private readonly service: ReportService;

  @Get()
  @UseGuards(AuthGuard)
  hello(@Req() req): Promise<string> {
    const user: DecodedIdToken = req.user;
    const userId = user?.uid;
    const tenantId = user?.tenant;
    return this.service.hello(userId, tenantId);
  }

  @Post('dailyreport')
  createDailyreport(): Promise<String> {
    return this.service.createDailyReport();
  }

  @Get('dailyreport')
  getDailyreport(): Promise<String> {
    return this.service.getDailyReport();
  }

  @Get('create')
  @UseGuards(AuthGuard, StravaAccessGuard)
  createReport(@Query() queryParams: any, @Req() req): Promise<DataFrame> {
    const user: DecodedIdToken = req.user;
    const stravaAccessToken = user?.stravaAccessToken;
    return this.service.createReport(stravaAccessToken, queryParams);
  }

  @Post('save')
  @UseGuards(AuthGuard)
  saveReport(@Req() req, @Body() body): Promise<boolean> {
    const user: DecodedIdToken = req.user;
    const userId = user.uid;
    const username = user.name;
    const tennant = user.tenant;
    const dataframe: DataFrame = body.dataframe;

    return this.service.saveReport(userId, username, tennant, dataframe);
  }

  @Get('getAll')
  @UseGuards(AuthGuard)
  getAllReports(@Req() req): Promise<any[]> {
    const user: DecodedIdToken = req.user;
    const tenant = user.tenant;
    return this.service.getAllReport(tenant);
  }

  @Get('getSingle/:id')
  getSingleReport(@Req() req, @Param() param): Promise<any[]> {
    const user: DecodedIdToken = req.user;
    if (!param.id) {
      throw new HttpException(
        'No report id was passed',
        HttpStatus.BAD_REQUEST,
      );
    }
    const id = param.id;

    return this.service.getSingleReport(id);
  }
}
