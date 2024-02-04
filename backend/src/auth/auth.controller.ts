import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { DecodedIdToken } from 'firebase-admin/auth';
import { AuthGuard } from 'src/gards/auth.gard';
import { AUTH_SERVICE_URL, UserInfo } from './auth.pb';
import { AuthService } from './auth.service';

@Controller(AUTH_SERVICE_URL)
export class AuthController {
  @Inject(AuthService)
  private readonly service: AuthService;

  @Get()
  hello(@Req() req): Promise<String> {
    const user: DecodedIdToken = req.user;
    const userId = user?.uid;
    const tenantId = user?.tenant;
    return this.service.hello(userId, tenantId);
  }

  @Patch('settenant')
  @UseGuards(AuthGuard)
  setTenant(@Req() req, @Body() body): Promise<void> {
    const user: DecodedIdToken = req.user;
    const userId = user?.uid;
    let role = user.role;
    const tenantName = body.tenant;

    if (role === undefined) {
      role = 'Athlete';
    }

    if (!tenantName) {
      throw new BadRequestException('No tenant provided');
    }

    return this.service.setTenantAndRole(userId, tenantName, role);
  }

  @Get('gettenant')
  @UseGuards(AuthGuard)
  getTenant(@Req() req): Promise<String> {
    const user: DecodedIdToken = req.user;
    return user?.tenant;
  }

  @Get('gettenant/list')
  @UseGuards(AuthGuard)
  getTenantList(@Req() req): Promise<Array<String>> {
    return this.service.getTenantList();
  }

  @Post('users/create')
  @UseGuards(AuthGuard)
  createUser(@Req() req, @Body() body): Promise<UserInfo> {
    const user: DecodedIdToken = req.user;
    const tenantId = user?.tenant;
    const userRole = user?.role;

    if (tenantId === 'Free' || tenantId === 'Standard') {
      throw new UnauthorizedException(
        'Only enterprise tenants can create users',
      );
    }

    if (userRole !== 'Admin') {
      throw new UnauthorizedException('Only admins can create users');
    }

    return this.service.createUser(body.name, body.email, body.role, tenantId);
  }

  @Delete('users/delete/:id')
  @UseGuards(AuthGuard)
  deleteUser(@Req() req, @Param() param): Promise<Boolean> {
    const user: DecodedIdToken = req.user;
    const tenantId = user?.tenant;
    const userRole = user?.role;

    if (tenantId === 'Free' || tenantId === 'Standard') {
      throw new UnauthorizedException(
        'Only enterprise tenants can delete users',
      );
    }

    if (userRole !== 'Admin') {
      throw new UnauthorizedException('Only admins can delete users');
    }

    return this.service.deleteUser(param.id);
  }

  @Get('users')
  @UseGuards(AuthGuard)
  getUsers(@Req() req): Promise<Array<UserInfo>> {
    const user: DecodedIdToken = req.user;
    const tenantId = user?.tenant;
    const userRole = user?.role;

    if (tenantId === 'Free' || tenantId === 'Standard') {
      throw new UnauthorizedException('Only enterprise tenants can list users');
    }

    if (userRole !== 'Admin') {
      throw new UnauthorizedException('Only admins can list users');
    }

    return this.service.getUsers(tenantId);
  }

  @Patch('users/reset/:id')
  @UseGuards(AuthGuard)
  resetPassword(@Req() req, @Param() param): Promise<Boolean> {
    const user: DecodedIdToken = req.user;
    const tenantId = user?.tenant;
    const userRole = user?.role;

    if (tenantId === 'Free' || tenantId === 'Standard') {
      throw new UnauthorizedException(
        'Only enterprise tenants can reset passwords',
      );
    }

    if (userRole !== 'Admin') {
      throw new UnauthorizedException('Only admins can reset passwords');
    }

    return this.service.resetPassword(param.id);
  }

  @Post('admin')
  createAdminUser(@Body() body): Promise<UserInfo> {
    // check if admin-password was provided
    const adminPassword = body.adminPassword;
    if (!adminPassword) {
      throw new BadRequestException('No admin password provided');
    }

    // check if admin-password is correct
    if (adminPassword !== process.env.ADMIN_PASSWORD) {
      throw new UnauthorizedException('Invalid admin password');
    }

    // check if name, email and password was provided
    const displayName = body.displayName;
    const email = body.email;
    const tenant = body.tenant;
    if (!displayName) {
      throw new BadRequestException('No displayName provided');
    }
    if (!email) {
      throw new BadRequestException('No email provided');
    }
    if (!tenant) {
      throw new BadRequestException('No tenant provided');
    }

    return this.service.createUser(displayName, email, 'Admin', tenant);
  }
}
