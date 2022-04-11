import { GetUser } from '@api/auth/get-user.decorator';
import { User } from '@api/auth/user.entity';
import { GetEmploymentsFilterDto } from '@api/employment/dto/get-employments-filter.dto';
import { Employment } from '@api/employment/employment.entity';
import { GetEmployment } from '@api/employment/get-employment.decorator';
import { EmploymentPeriodsDto } from '@api/employmentPeriods/dto/employment-periods.dto';
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

@Controller('employmentPeriods')
export class EmploymentPeriodController {
  constructor(private employmentPeriodsService: EmploymentPeriodService) {}

  @Get()
  getEmploymentPeriods(
    @Query() filterDto: GetEmploymentsFilterDto,
    @GetEmployment() employment: Employment,
  ): Promise<EmploymentPeriods[]> {
    return this.employmentPeriodsService.getEmploymentPeriods(
      filterDto,
      employment,
    );
  }

  @Post()
  createEmploymentPeriods(
    @Body() createEmploymentDto: EmploymentPeriodsDto,
    @GetEmployment() employment: Employment,
  ): Promise<EmploymentPeriods> {
    return this.employmentPeriodsService.createEmploymentPeriod(
      createEmploymentDto,
      employment,
    );
  }

  @Patch('/:id/status')
  updateEmploymentPeriodStatus(
    @Param('id') id: string,
    @GetUser() employment: Employment,
    @Body() updateEmploymentStatusDto: UpdateEmploymentPeriodsStatusDto,
  ): Promise<EmploymentPeriods> {
    const { status } = updateEmploymentStatusDto;
    return this.employmentPeriodsService.updateEmploymentPeriodStatus(
      id,
      status,
      employment,
    );
  }
}
