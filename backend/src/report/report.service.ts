import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportService {
  public async hello(userId: string, tenantId: String): Promise<String> {
    return `Hello! I am the report microservice.\nYour userId is: ${userId}\nYour tenantId is: ${tenantId}\n`;
  }
}
