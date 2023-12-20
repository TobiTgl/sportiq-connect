import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ADMINISTRATION_SERVICE_URL } from './administration.pb';
import { AdministrationService } from './administration.service';

@Controller(ADMINISTRATION_SERVICE_URL)
export class AdministrationController {
  @Inject(AdministrationService)
  private readonly service: AdministrationService;

  @Get()
  hello(): Promise<String> {
    return this.service.hello();
  }

  @Get('stravaAuth')
  stravaAuth(@Query() queryParams: any): Promise<String> {
    // Handle the Strava authorization
    return this.service.stravaAuth(queryParams);
  }

  @Get('athleteData')
  athleteData(): Promise<String> {
    // Handle the Strava authorization
    return this.service.athleteData();
  }

  @Get('getRefreshToken')
  getRefreshToken(): Promise<String> {
    // Handle the Strava refresh token
    return this.service.getRefreshToken();
  }
}
