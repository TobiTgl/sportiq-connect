import { Controller, Get, Inject } from '@nestjs/common';
import { USER_SERVICE_URL } from './user.pb';
import { UserService } from './user.service';

@Controller(USER_SERVICE_URL)
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  @Get()
  hello(): Promise<String> {
    return this.service.hello();
  }
}
