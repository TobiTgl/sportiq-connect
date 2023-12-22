import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  public async hello(userId: string, tenantId: String): Promise<String> {
    return `Hello! I am the auth microservice.\nYour userId is: ${userId}\nYour tenantId is: ${tenantId}\n`;
  }
}
