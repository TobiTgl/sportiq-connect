/* eslint-disable */
import { Observable } from 'rxjs';

export const ADMINISTRATION_SERVICE_NAME = 'AdministrationService';
export const ADMINISTRATION_SERVICE_URL = 'administration';

export interface AdministrationServiceClient {
  hello(): Observable<String>;
}

export interface AdministrationServiceController {
  hello(): Promise<String>;
}
