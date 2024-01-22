/* eslint-disable */
import { FirestoreDataConverter } from 'firebase-admin/firestore';
import { Observable } from 'rxjs';

export const REPORT_SERVICE_NAME = 'ReportService';
export const REPORT_SERVICE_URL = 'report';

export interface ReportServiceClient {
  hello(): Observable<String>;
}

export interface ReportServiceController {
  hello(): Promise<String>;
}

export class DataFrame {
  name: String;
  amountOfActivities: number;
  avgDistance: number;
  distanceData: Array<any>;
  avgMovingTime: number;
  movingTimeData: Array<any>;
  avgTotalElevationGain: number;
  typeSummary: Array<any>;
  avgSpeed: number;
  avgSpeedData: Array<any>;
  avgMaxSpeed: number;
  maxSpeedData: Array<any>;
  avgHeartRate: number;
  avgHeartRateData: Array<any>;
  avgMaxHeartRate: number;
  maxHeartRateData: Array<any>;
  constructor(
    name: String,
    amountOfActivities: number = 0,
    avgDistance: number = 0,
    distanceData: Array<any> = [],
    avgMovingTime: number = 0,
    movingTimeData: Array<any> = [],
    avgTotalElevationGain: number = 0,
    typeSummary: Array<any> = [],
    avgSpeed: number = 0,
    avgSpeedData: Array<any> = [],
    avgMaxSpeed: number = 0,
    maxSpeedData: Array<any> = [],
    avgHeartRate: number = 0,
    avgHeartRateData: Array<any> = [],
    avgMaxHeartRate: number = 0,
    maxHeartRateData: Array<any> = [],
  ) {
    this.name = name;
    this.amountOfActivities = amountOfActivities;
    this.avgDistance = avgDistance;
    this.distanceData = distanceData;
    this.avgMovingTime = avgMovingTime;
    this.movingTimeData = movingTimeData;
    this.avgTotalElevationGain = avgTotalElevationGain;
    this.typeSummary = typeSummary;
    this.avgSpeed = avgSpeed;
    this.avgSpeedData = avgSpeedData;
    this.avgMaxSpeed = avgMaxSpeed;
    this.maxSpeedData = maxSpeedData;
    this.avgHeartRate = avgHeartRate;
    this.avgHeartRateData = avgHeartRateData;
    this.avgMaxHeartRate = avgMaxHeartRate;
    this.maxHeartRateData = maxHeartRateData;
  }
}
