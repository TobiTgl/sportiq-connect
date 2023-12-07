import { Injectable } from '@nestjs/common';

@Injectable()
export class GatewayService {
  public async getHello(): Promise<String> {
    return 'Hello! I am the API-Gateway.';
  }
}
