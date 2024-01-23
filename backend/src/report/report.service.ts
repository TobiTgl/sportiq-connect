import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import axios from 'axios';
import { firestore } from 'firebase-admin';
import { Firestore, QuerySnapshot } from 'firebase-admin/firestore';
import { DataFrame } from './report.pb';

@Injectable()
export class ReportService {
  constructor(
    @Inject('FirestoreAdmin') private readonly firestore: Firestore,
  ) {}
  private readonly logger = new Logger(ReportService.name);

  public async hello(userId: string, tenantId: string): Promise<string> {
    return `Hello! I am the report microservice.\nYour userId is: ${userId}\nYour tenantId is: ${tenantId}\n`;
  }

  public async getActivities(
    stravaAccessToken: string,
    queryParams,
  ): Promise<Array<any>> {
    if (queryParams.before && queryParams.after) {
      if (queryParams.before < queryParams.after) {
        const temp = queryParams.before;
        queryParams.before = queryParams.after;
        queryParams.after = temp;
      }
    }

    const after = queryParams.after ? 'after=' + queryParams.after : '';
    const before = queryParams.before ? 'before=' + queryParams.before : '';

    const url = `https://www.strava.com/api/v3/athlete/activities?${before}&&${after}&&page=1&per_page=50`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${stravaAccessToken}`,
      },
    });

    if (response.status !== 200) {
      throw new HttpException(
        'Failed to get activities from Strava',
        response.status,
      );
    }

    return response.data;
  }

  public async createReport(
    stravaAccessToken: string,
    queryParams,
  ): Promise<DataFrame> {
    const after = new Date(queryParams.after * 1000).toDateString();
    const before = new Date(queryParams.before * 1000).toDateString();
    const report: DataFrame = new DataFrame(`von ${after} bis ${before}`);
    const data = this.getActivities(stravaAccessToken, queryParams);
    (await data).forEach(function (object) {
      report.amountOfActivities++;
      if (Object.is(object.distance, null)) {
        report.avgDistance += 0;
      } else {
        report.avgDistance += object.distance;
      }
      if (Object.is(object.distance, null)) {
        report.distanceData.push(0);
      } else {
        report.distanceData.push(object.distance);
      }
      if (Object.is(object.moving_time, null)) {
        report.avgMovingTime += 0;
      } else {
        report.avgMovingTime += object.moving_time;
      }
      if (Object.is(object.moving_time, null)) {
        report.movingTimeData.push(0);
      } else {
        report.movingTimeData.push(object.moving_time);
      }
      if (Object.is(object.total_elevation_gain, null)) {
        report.avgTotalElevationGain += 0;
      } else {
        report.avgTotalElevationGain += object.total_elevation_gain;
      }
      if (!report.typeSummary.includes(object.type)) {
        report.typeSummary.push(object.type);
      }
      if (Object.is(object.average_speed, null)) {
        report.avgSpeed += 0;
      } else {
        report.avgSpeed += object.average_speed;
      }
      if (Object.is(object.moving_time, null)) {
        report.avgSpeedData.push(0);
      } else {
        report.avgSpeedData.push(object.average_speed);
      }
      if (Object.is(object.max_speed, null)) {
        report.avgMaxSpeed += 0;
      } else {
        report.avgMaxSpeed += object.max_speed;
      }
      if (Object.is(object.max_speed, null)) {
        report.maxSpeedData.push(0);
      } else {
        report.maxSpeedData.push(object.max_speed);
      }
      if (object.has_heartrate === false) {
        report.avgHeartRate += 0;
      } else {
        report.avgHeartRate += object.average_heartrate;
      }
      if (object.has_heartrate === false) {
        report.avgHeartRateData.push(0);
      } else {
        report.avgHeartRateData.push(object.average_heartrate);
      }
      if (object.has_heartrate === false) {
        report.avgMaxHeartRate += 0;
      } else {
        report.avgMaxHeartRate += object.max_heartrate;
      }
      if (object.has_heartrate === false) {
        report.maxHeartRateData.push(0);
      } else {
        report.maxHeartRateData.push(object.max_heartrate);
      }
    });
    report.avgDistance = report.avgDistance / report.amountOfActivities;
    report.avgMovingTime = report.avgMovingTime / report.amountOfActivities;
    report.avgTotalElevationGain =
      report.avgTotalElevationGain / report.amountOfActivities;
    report.avgSpeed = report.avgSpeed / report.amountOfActivities;
    report.avgMaxSpeed = report.avgMaxSpeed / report.amountOfActivities;
    report.avgHeartRate = report.avgHeartRate / report.amountOfActivities;
    report.avgMaxHeartRate = report.avgMaxHeartRate / report.amountOfActivities;
    return report;
  }

  public async saveReport(
    userId: string,
    username: string,
    tenant: string,
    dataframe: DataFrame,
  ): Promise<boolean> {
    const docRef = this.firestore.collection('report-service').doc();

    await docRef
      .set({
        userId,
        username,
        tenant,
        body: dataframe,
        timestamp: Date.now(),
      })
      .catch((error) => {
        this.logger.error(error);
        throw new HttpException(
          'saving report failed',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
    this.logger.log(
      'Report saved for user: ' + userId + ' and tenant: ' + tenant,
    );
    return true;
  }

  public async getAllReport(tenant: string): Promise<any[]> {
    const docRef = this.firestore
      .collection('report-service')
      .where('tenant', '==', tenant);

    let result;
    await docRef
      .get()
      .then((res) => {
        if (res.empty) {
          result = [];
        } else {
          result = res.docs.map((doc) => {
            const stringBody = doc.data().body.toString();
            const body = JSON.parse(stringBody);
            return {
              ...body,
              username: doc.data().username,
              timestamp: doc.data().timestamp,
              id: doc.id,
            };
          });
        }
      })
      .catch((error) => {
        this.logger.error('Error while getting reports: ' + error);
        throw new HttpException('Error while getting reports', error.status);
      });

    return result;
  }

  public async getSingleReport(id: string): Promise<any> {
    const docRef = this.firestore.collection('report-service').doc(id);

    let result;
    await docRef
      .get()
      .then((res) => {
        if (!res.exists) {
          result = [];
        } else {
          const stringBody = res.data().body.toString();
          const body = JSON.parse(stringBody);
          result = {
            ...body,
            username: res.data().username,
            timestamp: res.data().timestamp,
            id: res.id,
          };
        }
      })
      .catch((error) => {
        this.logger.error('Error while getting single reports: ' + error);
        throw new HttpException(
          'Error while getting single reports',
          error.status,
        );
      });

    return result;
  }

  public async getDailyReport(): Promise<String> {
    const end = new Date();
    const start = new Date();
    end.setUTCHours(23, 59, 59, 999); // Set the time to the end of today
    start.setUTCHours(0, 0, 0, 0);

    const dailyReportRef = this.firestore
      .collection('daily-report')
      .where('timestamp', '>=', start)
      .where('timestamp', '<=', end);

    const reports = await dailyReportRef.get().catch((error) => {
      this.logger.error(error);
      throw new HttpException(
        `Couldn't get report`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    });
    return reports.docs[0].data().reports;
  }

  public async createDailyReport(): Promise<String> {
    const end = new Date();
    const start = new Date();
    start.setTime(end.getTime() - 24 * 60 * 60 * 1000); // Subtract 24 hours from the current time
    const reportRef = this.firestore
      .collection('report-service');

    const reports = await reportRef.get().catch((error) => {
      this.logger.error(error);
      throw new HttpException(
        `Couldn't get report`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    });
    let reportCounter = 0
    reports.forEach((report) => {
      const createdOn = report.data().timestamp;
      if (createdOn >= start && createdOn <= end) {
        reportCounter++;
      }
    });

    const newDailyReport = this.firestore
      .collection('daily-report')
      .doc(end.toISOString());

    await newDailyReport
      .set({
        timestamp: end,
        reports: reportCounter,
      })
      .catch((error) => {
        this.logger.error(error);
        throw new HttpException(
          'Presisting token failed',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });

    this.logger.log(
      'Created daily report at ' +
        end.toISOString() +
        ' number of reports from the last 24h: ' +
        reportCounter,
    );
    return 'Report created';
  }
}
