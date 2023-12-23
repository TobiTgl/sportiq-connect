import { BadRequestException, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthService {
  public async hello(userId: string, tenantId: String): Promise<String> {
    return `Hello! I am the auth microservice.\nYour userId is: ${userId}\nYour tenantId is: ${tenantId}\n`;
  }

  public async setTenant(userId: string, tenantName: String): Promise<void> {
    // get existing tenants and check if the given tenant exists
    const tenantList = await admin.auth().tenantManager().listTenants();
    const tenantId = tenantList.tenants.find(
      (tenant) => tenant.displayName === tenantName,
    )?.tenantId;

    if (!tenantId) {
      throw new BadRequestException("Given tenant doesn't exist.");
    }

    // set the new tenant
    admin
      .auth()
      .setCustomUserClaims(userId, {
        tenant: tenantName,
      })
      .catch((error) => {
        return new BadRequestException(error);
      });
  }
}
