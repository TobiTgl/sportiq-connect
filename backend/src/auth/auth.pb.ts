/* eslint-disable */
import { Observable } from 'rxjs';

export const AUTH_SERVICE_NAME = 'AuthService';
export const AUTH_SERVICE_URL = 'auth';

export interface AuthServiceClient {
  hello(): Observable<String>;
}

export interface AuthServiceController {
  hello(): Promise<String>;
}

export interface UserInfo {
  userId: string;
  name: string;
  email: string;
  role: string;
}
