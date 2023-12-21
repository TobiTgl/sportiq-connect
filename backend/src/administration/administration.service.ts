import { HttpService } from '@nestjs/axios';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { Firestore } from 'firebase-admin/firestore';
@Injectable()
export class AdministrationService {
  constructor(
    private readonly httpService: HttpService,
    @Inject('FirestoreAdmin') private readonly firestore: Firestore,
  ) {}

  private readonly logger = new Logger(AdministrationService.name);
  private authData: any = {};

  //Fetch athlete data from Strava with accesstoken currently from env file
  public async athleteData(): Promise<String> {
    const stravaAthleteUrl = `https://www.strava.com/api/v3/athlete/activities?per_page=30`;
    const dataAthlete = await firstValueFrom(
      this.httpService
        .get(stravaAthleteUrl, {
          headers: {
            accept: `application/json`,
            Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error('status' + error.response.status);
            this.logger.error(error.response.data);
            throw 'An athlete error happened!';
          }),
        ),
    );
    console.log(dataAthlete.data);
    return dataAthlete.data;
  }

  //Authenticates the user with Strava (receives access token & refresh token)
  public async stravaAuth(queryParams: any): Promise<String> {
    const authUrl = `https://www.strava.com/oauth/token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${queryParams.code}&grant_type=authorization_code`;
    if ('error' in queryParams && queryParams.error === 'access_denied') {
      return 'Connection to Strava failed. Please try again';
    }

    let dataAuth = await firstValueFrom(
      this.httpService.post(authUrl).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw new HttpException(
            'Auth failed, please try again',
            HttpStatus.UNAUTHORIZED,
          );
        }),
      ),
    );
    this.authData = dataAuth;
    console.log(this.authData.data);

    const docRef = this.firestore
      .collection('administration-service')
      .doc('userid(123)');

    await docRef.set({
      username: 'Ade',
      stravaAccessToken: this.authData.data.access_token,
      stravaRefreshToken: this.authData.data.refresh_token,
    });
    return 'You are now connected to Strava! You can close this window.';
  }

  //Refreshes the access token (should be called before every request to Strava)
  public async getRefreshToken(): Promise<String> {
    const stravaRefreshUrl = `https://www.strava.com/oauth/token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&refresh_token=${process.env.REFRESH_TOKEN}&grant_type=refresh_token`;
    let expires_at = 1702047464;

    if (expires_at < Date.now() / 1000) {
      let refreshToken = await firstValueFrom(
        this.httpService.post(stravaRefreshUrl).pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw new HttpException(
              'Auth failed, please try again',
              HttpStatus.UNAUTHORIZED,
            );
          }),
        ),
      );

      console.log(refreshToken);
    }
    return 'Token refreshed';
  }

  public async hello(): Promise<String> {
    const collection = this.firestore.collection('administration-service');
    console.log(collection);

    const snapshot = await this.firestore
      .collection('administration-service')
      .get();
    snapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });
    const docRef = this.firestore
      .collection('administration-service')
      .doc('alovelace');

    await docRef.set({
      first: 'Ada',
      last: 'Lovelace',
      born: 1815,
    });

    return 'Hello! I am the administration microservice.';
  }
}
