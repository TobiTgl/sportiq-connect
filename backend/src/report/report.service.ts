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

  public async getAll(): Promise<Array<Object>> {
    // TODO: get all reports from database
    return [
      {
        id: '1',
        title: 'Report 1',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies aliquam, nunc nisl ultricies nunc, vitae aliquet nisl nunc eget nisl. Donec auctor, nisl eget ultricies aliquam, nunc nisl ultricies nunc, vitae aliquet nisl nunc eget nisl.',
      },
      {
        id: '2',
        title: 'Report 2',
        text: 'This is a report about something',
      },
      {
        id: '3',
        title: 'Report 3',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies aliquam, nunc nisl ultricies nunc, vitae aliquet nisl nunc eget nisl. Donec auctor, nisl eget ultricies aliquam, nunc nisl ultricies nunc, vitae aliquet nisl nunc eget nisl.',
      },
      {
        id: '4',
        title: 'Report 4',
        text: 'This is a report about something',
      },
      {
        id: '5',
        title: 'Report 5',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies aliquam, nunc nisl ultricies nunc, vitae aliquet nisl nunc eget nisl. Donec auctor, nisl eget ultricies aliquam, nunc nisl ultricies nunc, vitae aliquet nisl nunc eget nisl.',
      },
      {
        id: '6',
        title: 'Report 6',
        text: 'This is a report about something',
      },
      {
        id: '7',
        title: 'Report 7',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies aliquam, nunc nisl ultricies nunc, vitae aliquet nisl nunc eget nisl. Donec auctor, nisl eget ultricies aliquam, nunc nisl ultricies nunc, vitae aliquet nisl nunc eget nisl.',
      },
      {
        id: '8',
        title: 'Report 8',
        text: 'This is a report about something',
      },
      {
        id: '9',
        title: 'Report 9',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies aliquam, nunc nisl ultricies nunc, vitae aliquet nisl nunc eget nisl. Donec auctor, nisl eget ultricies aliquam, nunc nisl ultricies nunc, vitae aliquet nisl nunc eget nisl.',
      },
      {
        id: '10',
        title: 'Report 10',
        text: 'This is a report about something',
      },
    ];
  }

  public async getSingleReport(id: string): Promise<Object> {
    // TODO: get report with the given id from database or return error
    // throw new HttpException('Report not found', HttpStatus.NOT_FOUND);
    return {
      id: id,
      title: `Report ${id}`,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies aliquam, nunc nisl ultricies nunc, vitae aliquet nisl nunc eget nisl. Donec auctor, nisl eget ultricies aliquam, nunc nisl ultricies nunc, vitae aliquet nisl nunc eget nisl.',
    };
  }

  public async dailyreport(): Promise<String> {
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
    return 'Report created';
  }
}
