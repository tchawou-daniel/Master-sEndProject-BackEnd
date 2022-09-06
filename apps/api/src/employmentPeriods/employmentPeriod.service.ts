import { Employment } from '@api/employment/employment.entity';
import { CreateEmploymentPeriodsDto } from '@api/employmentPeriods/dto/create-employment-periods.dto';
import { GetEmploymentPeriodsFilterDto } from '@api/employmentPeriods/dto/get-employment-periods-filter.dto';
import { UpdateEmploymentPeriodDto } from '@api/employmentPeriods/dto/update-employment-period.dto';
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
  ): Promise<EmploymentPeriods[]> {
    return this.employmentPeriodsRepository.getEmploymentPeriods(filterDto);
  }

  createEmploymentPeriod(
    createEmploymentPeriodsDto: CreateEmploymentPeriodsDto,
  ): Promise<EmploymentPeriods> {
    return this.employmentPeriodsRepository.createEmploymentPeriod(
      createEmploymentPeriodsDto,
    );
  }

  async getEmploymentPeriodById(
    id: string,
    employment?: Employment,
  ): Promise<EmploymentPeriods> {
    const found = await this.employmentPeriodsRepository.findOne({
      // where: { id, employment },
      where: { id },
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
  ): Promise<EmploymentPeriods> {
    const employmentPeriods = await this.getEmploymentPeriodById(id);
    employmentPeriods.employmentPeriodStatus = status;
    await this.employmentPeriodsRepository.save(employmentPeriods);

    return employmentPeriods;
  }

  async updateEmployment(
    id: string,
    updateEmploymentDto: UpdateEmploymentPeriodDto,
  ): Promise<EmploymentPeriods> {
    const employmentPeriods = await this.getEmploymentPeriodById(id);

    employmentPeriods.employmentPeriodStatus =
      updateEmploymentDto.employmentPeriodStatus;
    employmentPeriods.numberOfDays = updateEmploymentDto.numberOfDays;
    employmentPeriods.numberOfHours = updateEmploymentDto.numberOfHours;
    employmentPeriods.effectiveAsOf = updateEmploymentDto.effectiveAsOf;
    employmentPeriods.effectiveUntil = updateEmploymentDto.effectiveUntil;

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
