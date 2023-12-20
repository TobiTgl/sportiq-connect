import { Controller, Get, Inject, Query } from '@nestjs/common';
import { AUTH_SERVICE_URL } from './auth.pb';
import { AuthService } from './auth.service';

@Controller(AUTH_SERVICE_URL)
export class AuthController {
  @Inject(AuthService)
  private readonly service: AuthService;

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
