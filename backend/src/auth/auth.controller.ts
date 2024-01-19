import {
  Controller,
  Get,
  Inject,
  Post,
  Req,
  UseGuards,
  BadRequestException,
  Body,
  UnauthorizedException,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { AUTH_SERVICE_URL } from './auth.pb';
import { AuthService } from './auth.service';
import { DecodedIdToken } from 'firebase-admin/auth';
import { UserInfo } from './auth.pb';
import { AuthGuard } from './auth.gard';

@Controller(AUTH_SERVICE_URL)
@UseGuards(AuthGuard)
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
  getTenant(@Req() req): Promise<String> {
    const user: DecodedIdToken = req.user;
    return user?.tenant;
  }

  @Get('gettenant/list')
  getTenantList(@Req() req): Promise<Array<String>> {
    return this.service.getTenantList();
  }

  @Post('users/create')
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
}
