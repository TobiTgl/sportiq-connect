import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportService {
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
    return {
      id: id,
      title: `Report ${id}`,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies aliquam, nunc nisl ultricies nunc, vitae aliquet nisl nunc eget nisl. Donec auctor, nisl eget ultricies aliquam, nunc nisl ultricies nunc, vitae aliquet nisl nunc eget nisl.',
    };
  }
}
