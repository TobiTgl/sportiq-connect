import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdministrationModule } from 'src/administration/administration.module';
import { AuthModule } from 'src/auth/auth.module';
import { FirestoreModule } from 'src/firestore/firestore.module';
import { ReportModule } from 'src/report/report.module';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';

@Module({
  imports: [
    AuthModule,
    AdministrationModule,
    ReportModule,
    FirestoreModule,
    ConfigModule.forRoot(),
  ],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}
