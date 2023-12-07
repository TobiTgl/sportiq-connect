import { Injectable } from '@nestjs/common';

@Injectable()
export class AnalysisService {
  public async hello(): Promise<String> {
    return 'Hello! I am the analysis microservice.';
  }
}
