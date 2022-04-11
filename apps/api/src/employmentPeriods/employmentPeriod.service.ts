import { User } from '@api/auth/user.entity';
import { Employment } from '@api/employment/employment.entity';
import { EmploymentPeriodsDto } from '@api/employmentPeriods/dto/employment-periods.dto';
import { GetEmploymentPeriodsFilterDto } from '@api/employmentPeriods/dto/get-employment-periods-filter.dto';
import { EmploymentPeriodsRepository } from '@api/employmentPeriods/employementPeriods.repository';
import { EmploymentPeriods } from '@api/employmentPeriods/employmentPeriods.entity';
import { Get, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { EmploymentPeriodStatus } from '../../common/types/EmploymentPeriods';

@Injectable()
export class EmploymentPeriodService {
  constructor(
    @InjectRepository(EmploymentPeriodsRepository)
    private employmentPeriodsRepository: EmploymentPeriodsRepository,
  ) {}

  @Get()
  getEmploymentPeriods(
    filterDto: GetEmploymentPeriodsFilterDto,
    employment: Employment,
  ): Promise<EmploymentPeriods[]> {
    return this.employmentPeriodsRepository.getEmploymentPeriods(
      filterDto,
      employment,
    );
  }

  createEmploymentPeriod(
    createEmploymentPeriodsDto: EmploymentPeriodsDto,
    employment: Employment,
  ): Promise<EmploymentPeriods> {
    return this.employmentPeriodsRepository.createEmploymentPeriod(
      createEmploymentPeriodsDto,
      employment,
    );
  }

  async getEmploymentPeriodById(
    id: string,
    employment: Employment,
  ): Promise<EmploymentPeriods> {
    const found = await this.employmentPeriodsRepository.findOne({
      where: { id, employment },
    });
    if (!found) {
      throw new NotFoundException(
        `Employment Period with ID "${id}" not found`,
      );
    }
    return found;
  }

  async updateEmploymentPeriodStatus(
    id: string,
    status: EmploymentPeriodStatus,
    employment: Employment,
  ): Promise<EmploymentPeriods> {
    const employmentPeriods = await this.getEmploymentPeriodById(
      id,
      employment,
    );
    employmentPeriods.employmentPeriodStatus = status;
    await this.employmentPeriodsRepository.save(employmentPeriods);

    return employmentPeriods;
  }

  async deleteEmploymentPeriods(
    id: string,
    employment: Employment,
  ): Promise<void> {
    const result = await this.employmentPeriodsRepository.delete({
      id,
      employment,
    });
    if (result.affected === 0) {
      throw new NotFoundException(
        `Employment Periods with ID "${id}" not found`,
      );
    }
  }
}
