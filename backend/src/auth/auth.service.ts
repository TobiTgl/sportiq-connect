import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  public async hello(): Promise<String> {
    return 'Hello! I am the auth microservice.';
  }
}
