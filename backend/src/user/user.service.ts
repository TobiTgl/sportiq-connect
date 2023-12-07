import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  public async hello(): Promise<String> {
    return 'Hello! I am the user microservice.';
  }
}
