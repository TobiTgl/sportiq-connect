import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { DecodedIdToken } from 'firebase-admin/auth';
import { AuthGuard } from 'src/gards/auth.gard';
import { ADMINISTRATION_SERVICE_URL } from './administration.pb';
import { AdministrationService } from './administration.service';

@Controller(ADMINISTRATION_SERVICE_URL)
export class AdministrationController {
  @Inject(AdministrationService)
  private readonly service: AdministrationService;

  @Get()
  @UseGuards(AuthGuard)
  hello(@Req() req): Promise<String> {
    const user: DecodedIdToken = req.user;
    const userId = user?.uid;
    const tenantId = user?.tenant;
    return this.service.hello(userId, tenantId);
  }

  @Get('stravaAuth')
  @UseGuards(AuthGuard)
  stravaAuth(@Query() queryParams: any, @Req() req): Promise<String> {
    // Handle the Strava authorization
    return this.service.stravaAuth(queryParams, req);
  }

  @Get('athleteData')
  @UseGuards(AuthGuard)
  athleteData(@Req() req): Promise<String> {
    // Handle the Strava authorization
    return this.service.athleteData(req);
  }

  @Get('disconnectStrava')
  @UseGuards(AuthGuard)
  disconnectStrava(@Req() req): Promise<String> {
    return this.service.disconnectStrava(req);
  }

  @Get('getRefreshToken')
  @UseGuards(AuthGuard)
  getRefreshToken(@Req() req): Promise<String> {
    // Handle the Strava refresh token
    return this.service.refreshAccessToken(req);
  }

  @Get('getStravaId')
  @UseGuards(AuthGuard)
  getStravaId(@Req() req): Promise<String> {
    //Get the Strava athlete id
    return this.service.getStravaId(req);
  }

  @Get('theme/:tenant')
  getTheme(@Param() param): Promise<String> {
    let tenant = param.tenant;

    if (tenant === undefined) {
      tenant = 'Free';
    }

    return this.service.getTheme(tenant);
  }

  @Post('theme')
  @UseGuards(AuthGuard)
  setTheme(@Req() req, @Body() body): Promise<Boolean> {
    const user: DecodedIdToken = req.user;
    const tenant = user?.tenant;
    const userRole = user?.role;

    if (tenant === 'Free' || tenant === 'Standard') {
      throw new UnauthorizedException(
        'Only enterprise tenants can set a custom theme',
      );
    }

    if (userRole !== 'Admin') {
      throw new UnauthorizedException('Only admins can set a custom theme');
    }

    return this.service.setTheme(tenant, body.color);
  }
}
