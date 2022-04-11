import { User } from '@api/auth/user.entity';
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
    user: User,
  ): Promise<EmploymentPeriods[]> {
    return this.employmentPeriodsRepository.getEmploymentPeriods(
      filterDto,
      user,
    );
  }

  createEmploymentPeriod(
    createEmploymentPeriodsDto: EmploymentPeriodsDto,
    user: User,
  ): Promise<EmploymentPeriods> {
    return this.employmentPeriodsRepository.createEmploymentPeriod(
      createEmploymentPeriodsDto,
      user,
    );
  }

  async getEmploymentPeriodById(
    id: string,
    user: User,
  ): Promise<EmploymentPeriods> {
    const found = await this.employmentPeriodsRepository.findOne({
      where: { id, user },
    });
    if (!found) {
      throw new NotFoundException(
        `Employment Period with ID "${id}" not found`,
      );
    }
    return found;
  }

  async updateEmploymentPeriod(
    id: string,
    status: EmploymentPeriodStatus,
    user: User,
  ): Promise<EmploymentPeriods> {
    const employmentPeriods = await this.getEmploymentPeriodById(id, user);
    employmentPeriods.employmentPeriodStatus = status;
    await this.employmentPeriodsRepository.save(employmentPeriods);

    return employmentPeriods;
  }

  async deleteEmploymentPeriods(id: string, user: User): Promise<void> {
    const result = await this.employmentPeriodsRepository.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException(
        `Employment Periods with ID "${id}" not found`,
      );
    }
  }
}
