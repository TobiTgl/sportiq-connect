import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { UserModule } from 'src/user/user.module';
import { AnalysisModule } from 'src/analysis/analysis.module';
import { ReportModule } from 'src/report/report.module';

@Module({
  imports: [AuthModule, UserModule, AnalysisModule, ReportModule],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}
