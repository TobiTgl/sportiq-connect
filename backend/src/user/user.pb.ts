/* eslint-disable */
import { Observable } from 'rxjs';

export const USER_SERVICE_NAME = 'UserService';
export const USER_SERVICE_URL = 'user';

export interface UserServiceClient {
  hello(): Observable<String>;
}

export interface UserServiceController {
  hello(): Promise<String>;
}
