import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { UserInfo } from './auth.pb';

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

    this.logger.log(
      'Set tenant and role for user ' +
        userId +
        ': ' +
        tenantName +
        ', ' +
        role,
    );
  }

  public async createUser(
    name: string,
    email: string,
    role: string,
    tenant: string,
  ): Promise<UserInfo> {
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
    await this.setTenantAndRole(user.uid, tenant, role).catch((error) => {
      throw error;
    });

    this.logger.log(
      'Created user: ' + name + ', ' + email + ', ' + role + ', ' + tenant,
    );

    const userInfo: UserInfo = {
      userId: user.uid,
      name: user.displayName,
      email: user.email,
      role: role,
    };
    return userInfo;
  }

  public async deleteUser(userId: string): Promise<Boolean> {
    await admin
      .auth()
      .deleteUser(userId)
      .catch((error) => {
        this.logger.error('Error deleting user: ' + error);
        throw new BadRequestException(error);
      });

    this.logger.log('Deleted user: ' + userId);
    return true;
  }

  public async getUsers(tenant: string): Promise<Array<UserInfo>> {
    const userList = await admin
      .auth()
      .listUsers()
      .catch((error) => {
        this.logger.error('Error listing users: ' + error);
        throw new BadRequestException(error);
      });

    const userInfoList: Array<UserInfo> = [];
    userList.users.forEach((user) => {
      if (user.customClaims?.tenant === tenant) {
        userInfoList.push({
          userId: user.uid,
          name: user.displayName,
          email: user.email,
          role: user.customClaims?.role,
        });
      }
    });

    return userInfoList;
  }

  public async getTenantList(): Promise<Array<String>> {
    return (await admin.auth().tenantManager().listTenants()).tenants.map(
      (tenant) => tenant.displayName,
    );
  }

  public async resetPassword(userId: string): Promise<Boolean> {
    await admin
      .auth()
      .updateUser(userId, {
        password: 'SiqC@' + new Date().getFullYear(),
      })
      .catch((error) => {
        this.logger.error('Error resetting password: ' + error);
        throw new BadRequestException(error);
      });
    return true;
  }
}
