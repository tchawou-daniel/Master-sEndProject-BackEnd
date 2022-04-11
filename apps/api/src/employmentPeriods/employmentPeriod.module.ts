import { EmploymentModule } from '@api/employment/employment.module';
import { EmploymentPeriodsRepository } from '@api/employmentPeriods/employementPeriods.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmploymentPeriodController } from './employmentPeriod.controller';
import { EmploymentPeriodService } from './employmentPeriod.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmploymentPeriodsRepository]),
    EmploymentModule,
  ],
  controllers: [EmploymentPeriodController],
  providers: [EmploymentPeriodService],
})
export class EmploymentPeriodModule {}
