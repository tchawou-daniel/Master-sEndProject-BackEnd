import { Module } from '@nestjs/common';

import { EmploymentDaysController } from './employmentDays.controller';
import { EmploymentDaysService } from './employmentDays.service';

@Module({
  controllers: [EmploymentDaysController],
  providers: [EmploymentDaysService],
})
export class EmploymentDaysModule {}
