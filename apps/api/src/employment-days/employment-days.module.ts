import { Module } from '@nestjs/common';
import { EmploymentDaysController } from './employment-days.controller';
import { EmploymentDaysService } from './employment-days.service';

@Module({
  controllers: [EmploymentDaysController],
  providers: [EmploymentDaysService]
})
export class EmploymentDaysModule {}
