import { Injectable } from '@nestjs/common';

@Injectable()
export class AnalysisService {
  public async hello(userId: string, tenantId: String): Promise<String> {
    return `Hello! I am the analysis microservice.\nYour userId is: ${userId}\nYour tenantId is: ${tenantId}\n`;
  }
}
