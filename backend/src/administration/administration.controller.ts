import { Controller, Get, Inject } from '@nestjs/common';
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
}
