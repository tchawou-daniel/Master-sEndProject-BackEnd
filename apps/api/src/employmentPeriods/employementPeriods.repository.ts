import { GetEmploymentsFilterDto } from '@api/employment/dto/get-employments-filter.dto';
import { Employment } from '@api/employment/employment.entity';
import { EmploymentPeriodsDto } from '@api/employmentPeriods/dto/employment-periods.dto';
import { EmploymentPeriods } from '@api/employmentPeriods/employmentPeriods.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(EmploymentPeriods)
export class EmploymentPeriodsRepository extends Repository<EmploymentPeriods> {
  async getEmploymentPeriods(
    filterDto: GetEmploymentsFilterDto,
    employment: Employment,
  ): Promise<EmploymentPeriods[]> {
    const { hiringStatus, search } = filterDto;

    const query = this.createQueryBuilder('employmentPeriods');
    query.where({ employment });

    if (hiringStatus) {
      query.andWhere('employment_periods.status = :status', { hiringStatus });
    }

    if (search) {
      query.andWhere(
        '(LOWER(employment_periods.title) LIKE LOWER(:search) OR LOWER(employment_periods.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    const employmentPeriods = await query.getMany();
    return employmentPeriods;
  }

  async createEmploymentPeriod(
    createEmploymentPeriods: EmploymentPeriodsDto,
    employment: Employment,
  ): Promise<EmploymentPeriods> {
    const {
      effectiveAsOf,
      effectiveUntil,
      numberOfHours,
      employmentPeriodStatus,
    } = createEmploymentPeriods;
    const employmentPeriods = this.create({
      effectiveAsOf,
      effectiveUntil,
      employmentPeriodStatus,
      numberOfHours,
      employment,
    });
    await this.save(employmentPeriods);
    return employmentPeriods;
  }
}
