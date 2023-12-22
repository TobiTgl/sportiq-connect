import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import * as admin from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/auth';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    // check if token exists
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    // verify token and add user data to request
    let decodedToken: DecodedIdToken;
    try {
      decodedToken = await admin.auth().verifyIdToken(token);
    } catch (error) {
      throw new UnauthorizedException(error); //'Error while verifying token');
    }

    request['user'] = decodedToken;
    if (!decodedToken.firebase.tenant) {
      request['user']['firebase']['tenant'] = 'free';
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
