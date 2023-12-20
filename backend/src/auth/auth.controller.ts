import { Controller, Get, Inject } from '@nestjs/common';
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
}
