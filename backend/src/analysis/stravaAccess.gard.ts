import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import axios from 'axios';
import { Firestore } from 'firebase-admin/firestore';

@Injectable()
export class StravaAccessGuard implements CanActivate {
  constructor(
    @Inject('FirestoreAdmin') private readonly firestore: Firestore,
  ) {}

  private readonly logger = new Logger('StravaAccessGuard');

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user?.uid;

    if (!userId) {
      throw new UnauthorizedException('No auth token provided');
    }

    const userRef = this.firestore
      .collection('administration-service')
      .doc(userId);

    const user = await this.getUser(userRef);
    if (!user.data().stravaAccessToken) {
      throw new HttpException(
        'No Strava Account connected',
        HttpStatus.BAD_REQUEST,
      );
    }

    const currentTime: number = Math.floor(new Date().getTime() / 1000) + 30;

    if (user.data().accessTokenExpiresAt > currentTime) {
      // create url
      const stravaRefreshUrl = `https://www.strava.com/oauth/token?client_id=${
        process.env.CLIENT_ID
      }&client_secret=${process.env.CLIENT_SECRET}&refresh_token=${
        user.data().stravaRefreshToken
      }&grant_type=refresh_token`;

      // fetch new access object
      let newStravaAccessObject = await axios.post(stravaRefreshUrl);

      if (newStravaAccessObject.status !== 200) {
        this.logger.error('Refreshing strava access token failed');
        throw new HttpException(
          'Refreshing strava access token failed',
          newStravaAccessObject.status,
        );
      }

      // update database
      await userRef
        .update({
          stravaAccessToken: newStravaAccessObject.data.access_token,
          accessTokenExpiresAt: newStravaAccessObject.data.expires_at,
        })
        .catch((error) => {
          this.logger.error(error);
          throw new HttpException(
            'Updating access token in database failed',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        });

      request['user']['stravaAccessToken'] =
        newStravaAccessObject.data.access_token;
    } else {
      request['user']['stravaAccessToken'] = user.data().stravaAccessToken;
    }

    return true;
  }

  private async getUser(userRef: any) {
    return await userRef.get().catch((error) => {
      this.logger.error(error);
      throw new HttpException(
        `Couldn't get user`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    });
  }
}
