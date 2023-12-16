import { Injectable } from '@nestjs/common';

@Injectable()
export class AdministrationService {
  public async hello(): Promise<String> {
    return 'Hello! I am the administration microservice.';
  }
}
