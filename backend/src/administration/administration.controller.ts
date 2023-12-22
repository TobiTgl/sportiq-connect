import { Controller, Get, Inject, Req, UseGuards } from '@nestjs/common';
import { ADMINISTRATION_SERVICE_URL } from './administration.pb';
import { AdministrationService } from './administration.service';
import { DecodedIdToken } from 'firebase-admin/auth';
import { AuthGuard } from 'src/auth/auth.gard';

@Controller(ADMINISTRATION_SERVICE_URL)
@UseGuards(AuthGuard)
export class AdministrationController {
  @Inject(AdministrationService)
  private readonly service: AdministrationService;

  @Get()
  hello(@Req() req): Promise<String> {
    const user: DecodedIdToken = req.user;
    const userId = user?.uid;
    const tenantId = user?.firebase?.tenant;
    return this.service.hello(userId, tenantId);
  }
}
