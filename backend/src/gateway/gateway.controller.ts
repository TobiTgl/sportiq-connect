import { Controller, Get } from '@nestjs/common';
import { GatewayService } from './gateway.service';

@Controller()
export class GatewayController {
  constructor(private readonly service: GatewayService) {}

  @Get()
  hello(): Promise<String> {
    return this.service.hello();
  }
}
