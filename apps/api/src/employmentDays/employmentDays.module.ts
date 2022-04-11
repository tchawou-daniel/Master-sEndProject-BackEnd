import { EmploymentDays } from '@api/employmentDays/employmentDays.entity';
import { EmploymentPeriodModule } from '@api/employmentPeriods/employmentPeriod.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmploymentDaysController } from './employmentDays.controller';
import { EmploymentDaysService } from './employmentDays.service';

@Module({
  imports: [TypeOrmModule.forFeature([EmploymentDays]), EmploymentPeriodModule],
  controllers: [EmploymentDaysController],
  providers: [EmploymentDaysService],
})
export class EmploymentDaysModule {}
