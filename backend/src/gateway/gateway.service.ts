import { Injectable } from '@nestjs/common';

@Injectable()
export class GatewayService {
  public async hello(userId: string, tenantId: String): Promise<String> {
    return `Hello! I am the API-Gateway.\nYour userId is: ${userId}\nYour tenantId is: ${tenantId}\n`;
  }
}
