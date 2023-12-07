/* eslint-disable */
import { Observable } from 'rxjs';

export const ANALYSIS_SERVICE_NAME = 'AnalysisService';
export const ANALYSIS_SERVICE_URL = 'analysis';

export interface AnylysisServiceClient {
  hello(): Observable<String>;
}

export interface AnylysisServiceController {
  hello(): Promise<String>;
}
