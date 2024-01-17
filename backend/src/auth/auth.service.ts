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

  public async createUser(
    name: string,
    email: string,
    role: string,
    tenant: string,
  ): Promise<Boolean> {
    // create user
    let user = await admin
      .auth()
      .createUser({
        displayName: name,
        email: email,
        password: 'SiqC@' + new Date().getFullYear(),
      })
      .catch((error) => {
        this.logger.error('Error creating user: ' + error);
        throw new BadRequestException(error);
      });

    // set tenant and role
    await this.setTenantAndRole(user.uid, tenant, role);

    this.logger.log(
      'Created user: ' + name + ', ' + email + ', ' + role + ', ' + tenant,
    );
    return false;
  }
}
