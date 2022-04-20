import { EmploymentDaysDto } from '@api/employmentDays/dto/employment-days.dto';
import { GetEmploymentDto } from '@api/employmentDays/dto/get-employment-dto';
import { UpdateEmploymentDaysStatusDto } from '@api/employmentDays/dto/update-employment-days-status.dto';
import { EmploymentDays } from '@api/employmentDays/employmentDays.entity';
import { EmploymentDaysService } from '@api/employmentDays/employmentDays.service';
import { EmploymentPeriods } from '@api/employmentPeriods/employmentPeriods.entity';
import { GetEmploymentPeriods } from '@api/employmentPeriods/get-employmentPeriods.decorate';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v0/employmentDays')
@UseGuards(AuthGuard('jwt'))
export class EmploymentDaysController {
  constructor(private employmentDaysService: EmploymentDaysService) {}

  @Get('/:id')
  getEmploymentDaysByID(
    @Query() filterDto: GetEmploymentDto,
    @GetEmploymentPeriods() employmentPeriods: EmploymentPeriods,
  ): Promise<EmploymentDays[]> {
    return this.employmentDaysService.getEmploymentDays(
      filterDto,
      employmentPeriods,
    );
  }

  // For a Period
  @Get('/employmentPeriod/:id')
  getEmploymentDaysByEmploymentPeriodId(
    @Query() filterDto: GetEmploymentDto,
    @GetEmploymentPeriods() employmentPeriods: EmploymentPeriods,
  ): Promise<EmploymentDays[]> {
    return this.employmentDaysService.getEmploymentDays(
      filterDto,
      employmentPeriods,
    );
  }

  @Post()
  createEmploymentPeriods(
    @Body() createEmploymentDto: EmploymentDaysDto,
    @GetEmploymentPeriods() employmentPeriods: EmploymentPeriods,
  ): Promise<EmploymentDays> {
    return this.employmentDaysService.createEmploymentDay(
      createEmploymentDto,
      employmentPeriods,
    );
  }

  @Patch('/:id/status')
  updateEmploymentDayStatus(
    @Param('id') id: string,
    @GetEmploymentPeriods() employmentPeriods: EmploymentPeriods,
    @Body() updateEmploymentDayStatusDto: UpdateEmploymentDaysStatusDto,
  ): Promise<EmploymentDays> {
    const { status } = updateEmploymentDayStatusDto;
    return this.employmentDaysService.updateEmploymentDaysStatus(
      id,
      status,
      employmentPeriods,
    );
  }

  @Patch('/:id')
  updateEmploymentDay(
    @Param('id') id: string,
    @GetEmploymentPeriods() employmentPeriods: EmploymentPeriods,
    @Body() updateEmploymentDayDto: EmploymentDaysDto,
  ): Promise<EmploymentDays> {
    return this.employmentDaysService.updateEmploymentDay(
      id,
      updateEmploymentDayDto,
      employmentPeriods,
    );
  }

  @Delete('/:id')
  deleteEmploymentDay(
    @Param('id') id: string,
    @GetEmploymentPeriods() employmentPeriods: EmploymentPeriods,
  ): Promise<void> {
    return this.employmentDaysService.deleteEmploymentDay(
      id,
      employmentPeriods,
    );
  }
}
