import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportService {
  public async hello(): Promise<String> {
    return 'Hello! I am the report microservice.';
  }
}
