import { EmploymentPeriods } from '@api/employmentPeriods/employmentPeriods.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(EmploymentPeriods)
export class EmploymentPeriodsRepository extends Repository<EmploymentPeriods> {}
