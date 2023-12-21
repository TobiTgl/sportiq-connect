import { Injectable } from '@nestjs/common';

@Injectable()
export class GatewayService {
  public async hello(): Promise<String> {
    return 'Hello! I am the API-.';
  }
}
