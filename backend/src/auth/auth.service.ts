import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  public async hello(userId: string, tenantId: String): Promise<String> {
    return `Hello! I am the auth microservice.\nYour userId is: ${userId}\nYour tenantId is: ${tenantId}\n`;
  }

  public async setTenantAndRole(
    userId: string,
    tenantName: String,
    role: String,
  ): Promise<void> {
    // get existing tenants and check if the given tenant exists
    const tenantList = await admin.auth().tenantManager().listTenants();
    const tenantId = tenantList.tenants.find(
      (tenant) => tenant.displayName === tenantName,
    )?.tenantId;

    if (!tenantId) {
      throw new BadRequestException("Given tenant doesn't exist.");
    }

    if (role !== 'Athlete' && role !== 'Admin') {
      throw new BadRequestException('Given role is not valid.');
    }

    // set the new tenant and role
    await admin
      .auth()
      .setCustomUserClaims(userId, {
        tenant: tenantName,
        role: role,
      })
      .catch((error) => {
        this.logger.error(
          'Error while setting tenant and role for user ' +
            userId +
            ': ' +
            error,
        );
        throw new BadRequestException(error);
      });
  }
}
