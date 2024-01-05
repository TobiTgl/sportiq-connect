import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Firestore } from 'firebase-admin/firestore';

@Injectable()
export class ReportService {
  constructor(
    @Inject('FirestoreAdmin') private readonly firestore: Firestore,
  ) {}

  private readonly logger = new Logger(ReportService.name);

  public async hello(userId: string, tenantId: String): Promise<String> {
    return `Hello! I am the report microservice.\nYour userId is: ${userId}\nYour tenantId is: ${tenantId}\n`;
  }

  public async dailyreport(req: any): Promise<void> {
    const end = new Date();
    const start = new Date();
    start.setTime(end.getTime() - 24 * 60 * 60 * 1000); // Subtract 24 hours from the current time

    console.log(start);
    console.log(end);

    const reportRef = this.firestore
      .collection('report-service')
      .where('timestamp', '>=', start)
      .where('timestamp', '<=', end);

    const reports = await reportRef.get().catch((error) => {
      this.logger.error(error);
      throw new HttpException(
        `Couldn't get report`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    });

    const newDailyReport = this.firestore
      .collection('report-service')
      .doc(end.toISOString());
    await newDailyReport
      .set({
        timestamp: end,
        reports: reports.size,
      })
      .catch((error) => {
        this.logger.error(error);
        throw new HttpException(
          'Presisting token failed',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });

    console.log(reports.size);
  }
}
