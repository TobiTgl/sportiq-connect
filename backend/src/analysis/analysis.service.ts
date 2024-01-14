import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AnalysisService {
  public async hello(userId: string, tenantId: String): Promise<String> {
    return `Hello! I am the analysis microservice.\nYour userId is: ${userId}\nYour tenantId is: ${tenantId}\n`;
  }

  public async getActivities(stravaAccessToken: string): Promise<Array<any>> {
    const url = 'https://www.strava.com/api/v3/athlete/activities?per_page=30';

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
}
