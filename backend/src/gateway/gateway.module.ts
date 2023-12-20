import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { AdministrationModule } from 'src/administration/administration.module';
import { AnalysisModule } from 'src/analysis/analysis.module';
import { ReportModule } from 'src/report/report.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    AdministrationModule,
    AnalysisModule,
    ReportModule,
    ConfigModule.forRoot(),
  ],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}
