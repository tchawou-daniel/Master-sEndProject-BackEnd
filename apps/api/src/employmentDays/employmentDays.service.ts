import { EmploymentDaysDto } from '@api/employmentDays/dto/employmentDays.dto';
import { EmploymentDays } from '@api/employmentDays/employmentDays.entity';
import { EmploymentDaysRepository } from '@api/employmentDays/employmentDays.repository';
import { EmploymentPeriods } from '@api/employmentPeriods/employmentPeriods.entity';
import { Get, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { EmploymentDayStatus } from '../../common/types/employmentDays';

@Injectable()
export class EmploymentDaysService {
  constructor(
    @InjectRepository(EmploymentDaysRepository)
    private employmentDaysRepository: EmploymentDaysRepository,
  ) {}

  @Get()
  getEmploymentDays(
    filterDto: EmploymentDaysDto,
    employmentPeriod: EmploymentPeriods,
  ): Promise<EmploymentDays[]> {
    return this.employmentDaysRepository.getEmploymentDays(
      filterDto,
      employmentPeriod,
    );
  }

  async getEmploymentDayById(
    id: string,
    employmentPeriods: EmploymentPeriods,
  ): Promise<EmploymentDays> {
    const found = await this.employmentDaysRepository.findOne({
      where: { id, employmentPeriods },
    });
    if (!found) {
      throw new NotFoundException(`Employment day with ID "${id}" not found`);
    }
    return found;
  }

  createEmploymentDay(
    createEmploymentDayDto: EmploymentDaysDto,
    employmentPeriod: EmploymentPeriods,
  ): Promise<EmploymentDays> {
    return this.employmentDaysRepository.createEmploymentDay(
      createEmploymentDayDto,
      employmentPeriod,
    );
  }

  async deleteEmploymentDay(
    id: string,
    employmentPeriods: EmploymentPeriods,
  ): Promise<void> {
    const result = await this.employmentDaysRepository.delete({
      id,
      employmentPeriods,
    });

    if (result.affected === 0) {
      throw new NotFoundException(`Employment day with ID "${id}" not found`);
    }
  }

  async updateEmploymentDaysStatus(
    id: string,
    status: EmploymentDayStatus,
    employmentPeriod: EmploymentPeriods,
  ): Promise<EmploymentDays> {
    const employmentDays = await this.getEmploymentDayById(
      id,
      employmentPeriod,
    );

    employmentDays.employmentDayStatus = status;
    await this.employmentDaysRepository.save(employmentDays);

    return employmentDays;
  }

  async updateEmploymentDay(
    id: string,
    employmentDay: EmploymentDaysDto,
    employmentPeriod: EmploymentPeriods,
  ): Promise<EmploymentDays> {
    const employmentDays = await this.getEmploymentDayById(
      id,
      employmentPeriod,
    );

    await this.employmentDaysRepository.save(employmentDays);

    return employmentDays;
  }
}
