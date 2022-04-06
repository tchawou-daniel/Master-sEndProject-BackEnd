import { Module } from '@nestjs/common';

import { EmploymentPeriodController } from './employmentPeriod.controller';
import { EmploymentPeriodService } from './employmentPeriod.service';

@Module({
  controllers: [EmploymentPeriodController],
  providers: [EmploymentPeriodService],
})
export class EmploymentPeriodModule {}
