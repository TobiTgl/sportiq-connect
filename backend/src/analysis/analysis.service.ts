import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AnalysisService {
  public async hello(userId: string, tenantId: String): Promise<String> {
    return `Hello! I am the analysis microservice.\nYour userId is: ${userId}\nYour tenantId is: ${tenantId}\n`;
  }

  public async getActivities(
    stravaAccessToken: string,
    queryParams,
  ): Promise<Array<any>> {
    if (queryParams.before && queryParams.after) {
      if (queryParams.before < queryParams.after) {
        let temp = queryParams.before;
        queryParams.before = queryParams.after;
        queryParams.after = temp;
      }
    }

    const after = queryParams.after ? 'after' + queryParams.after : '';
    const before = queryParams.before ? '&before' + queryParams.before : '';

    const url = `https://www.strava.com/api/v3/athlete/activities?${after}${before}&per_page=30`;

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
