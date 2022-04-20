import { User } from '@api/auth/user.entity';
import { CreateEmploymentDaysDto } from '@api/employmentDays/dto/create-employment-days.dto';
import { GetEmploymentDto } from '@api/employmentDays/dto/get-employment-dto';
import { UpdateEmploymentDaysDto } from '@api/employmentDays/dto/update-employment-days.dto';
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
  getEmploymentDays(filterDto: GetEmploymentDto): Promise<EmploymentDays[]> {
    return this.employmentDaysRepository.getEmploymentDays(filterDto);
  }

  async getEmploymentDayById(id: string): Promise<EmploymentDays> {
    const found = await this.employmentDaysRepository.findOne({
      where: { id },
    });
    if (!found) {
      throw new NotFoundException(`Employment day with ID "${id}" not found`);
    }
    return found;
  }

  createEmploymentDay(
    createEmploymentDayDto: CreateEmploymentDaysDto,
    user: User,
  ): Promise<EmploymentDays> {
    return this.employmentDaysRepository.createEmploymentDay(
      createEmploymentDayDto,
      user,
    );
  }

  async deleteEmploymentDay(id: string): Promise<void> {
    const result = await this.employmentDaysRepository.delete({
      id,
    });
    if (result.affected === 0) {
      throw new NotFoundException(`Employment day with ID "${id}" not found`);
    }
  }

  async updateEmploymentDaysStatus(
    id: string,
    status: EmploymentDayStatus,
  ): Promise<EmploymentDays> {
    const employmentDays = await this.getEmploymentDayById(id);

    employmentDays.employmentDayStatus = status;
    await this.employmentDaysRepository.save(employmentDays);

    return employmentDays;
  }

  async updateEmploymentDay(
    id: string,
    updateEmploymentDayDto: UpdateEmploymentDaysDto,
  ): Promise<EmploymentDays> {
    const employmentDays = await this.getEmploymentDayById(id);
    employmentDays.employmentDayStatus = updateEmploymentDayDto.status;
    employmentDays.weekday = updateEmploymentDayDto.weekday;
    employmentDays.numberOfHours = updateEmploymentDayDto.numberOfHours;
    employmentDays.startTime = updateEmploymentDayDto.startTime;
    employmentDays.endTime = updateEmploymentDayDto.endTime;
    await this.employmentDaysRepository.save(employmentDays);

    return employmentDays;
  }
}
