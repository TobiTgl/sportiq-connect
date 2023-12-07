/* eslint-disable */
import { Observable } from 'rxjs';

export const REPORT_SERVICE_NAME = 'ReportService';
export const REPORT_SERVICE_URL = 'report';

export interface ReportServiceClient {
  hello(): Observable<String>;
}

export interface ReportServiceController {
  hello(): Promise<String>;
}
