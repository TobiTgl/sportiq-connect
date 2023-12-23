import {
  Controller,
  Get,
  Inject,
  Post,
  Req,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { AUTH_SERVICE_URL } from './auth.pb';
import { AuthService } from './auth.service';
import { DecodedIdToken } from 'firebase-admin/auth';
import { AuthGuard } from './auth.gard';

@Controller(AUTH_SERVICE_URL)
@UseGuards(AuthGuard)
export class AuthController {
  @Inject(AuthService)
  private readonly service: AuthService;

  @Get()
  hello(@Req() req): Promise<String> {
    const user: DecodedIdToken = req.user;
    const userId = user?.uid;
    const tenantId = user?.tenant;
    return this.service.hello(userId, tenantId);
  }

  @Post('settenant')
  setTenant(@Req() req): Promise<void> {
    const user: DecodedIdToken = req.user;
    const userId = user?.uid;
    const tenantName = req.body.tenant;

    if (!tenantName) {
      throw new BadRequestException('No tenant provided');
    }

    return this.service.setTenant(userId, tenantName);
  }
}
