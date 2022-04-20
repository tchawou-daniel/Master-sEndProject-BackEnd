import { GetUser } from '@api/auth/get-user.decorator';
import { User } from '@api/auth/user.entity';
import { GetEmploymentsFilterDto } from '@api/employment/dto/get-employments-filter.dto';
import { Employment } from '@api/employment/employment.entity';
import { EmploymentService } from '@api/employment/employment.service';
import { CreateEmploymentPeriodsDto } from '@api/employmentPeriods/dto/create-employment-periods.dto';
import { UpdateEmploymentPeriodDto } from '@api/employmentPeriods/dto/update-employment-period.dto';
import { UpdateEmploymentPeriodsStatusDto } from '@api/employmentPeriods/dto/update-employment-periods-status.dto';
import { EmploymentPeriodService } from '@api/employmentPeriods/employmentPeriod.service';
import { EmploymentPeriods } from '@api/employmentPeriods/employmentPeriods.entity';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('api/v0/employmentPeriods')
export class EmploymentPeriodController {
  constructor(
    private employmentPeriodsService: EmploymentPeriodService,
    private employmentService: EmploymentService,
  ) {}

  @Get()
  getEmploymentPeriods(
    @Query() filterDto: GetEmploymentsFilterDto,
  ): Promise<EmploymentPeriods[]> {
    return this.employmentPeriodsService.getEmploymentPeriods(filterDto);
  }

  @Get('/:id')
  getEmploymentPeriodById(@Param('id') id: string): Promise<EmploymentPeriods> {
    return this.employmentPeriodsService.getEmploymentPeriodById(id);
  }

  @Post()
  async createEmploymentPeriods(
    @Body() createEmploymentDto: CreateEmploymentPeriodsDto,
  ): Promise<EmploymentPeriods> {
    return this.employmentPeriodsService.createEmploymentPeriod(
      createEmploymentDto,
    );
  }

  @Patch('/:id')
  updateEmploymentPeriod(
    @Param('id') id: string,
    @GetUser() employment: Employment,
    @Body() updateEmploymentDto: UpdateEmploymentPeriodDto,
  ): Promise<EmploymentPeriods> {
    return this.employmentPeriodsService.updateEmployment(
      id,
      updateEmploymentDto,
    );
  }

  @Patch('/:id/status')
  updateEmploymentPeriodStatus(
    @Param('id') id: string,
    @Body() updateEmploymentStatusDto: UpdateEmploymentPeriodsStatusDto,
  ): Promise<EmploymentPeriods> {
    const { status } = updateEmploymentStatusDto;
    return this.employmentPeriodsService.updateEmploymentPeriodStatus(
      id,
      status,
    );
  }
}
