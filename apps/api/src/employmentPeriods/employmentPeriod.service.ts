import { EmploymentPeriodsRepository } from '@api/employmentPeriods/employementPeriods.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EmploymentPeriodService {
  constructor(
    @InjectRepository(EmploymentPeriodsRepository)
    private employmentPeriodsRepository: EmploymentPeriodsRepository,
  ) {}
}
