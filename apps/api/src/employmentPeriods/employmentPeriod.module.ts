import { EmploymentModule } from '@api/employment/employment.module';
import { EmploymentRepository } from '@api/employment/employment.repository';
import { EmploymentService } from '@api/employment/employment.service';
import { EmploymentPeriodsRepository } from '@api/employmentPeriods/employementPeriods.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmploymentPeriodController } from './employmentPeriod.controller';
import { EmploymentPeriodService } from './employmentPeriod.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EmploymentPeriodsRepository,
      EmploymentRepository,
    ]),
    EmploymentModule,
  ],
  controllers: [EmploymentPeriodController],
  providers: [EmploymentPeriodService, EmploymentService],
})
export class EmploymentPeriodModule {}
