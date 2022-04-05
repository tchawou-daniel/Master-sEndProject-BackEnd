import { Module } from '@nestjs/common';
import { EmploymentPeriodController } from './employment-period.controller';
import { EmploymentPeriodService } from './employment-period.service';

@Module({
  controllers: [EmploymentPeriodController],
  providers: [EmploymentPeriodService]
})
export class EmploymentPeriodModule {}
