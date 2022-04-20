import { GetUser } from '@api/auth/get-user.decorator';
import { User } from '@api/auth/user.entity';
import { CreateEmploymentDaysDto } from '@api/employmentDays/dto/create-employment-days.dto';
import { GetEmploymentDto } from '@api/employmentDays/dto/get-employment-dto';
import { UpdateEmploymentDaysStatusDto } from '@api/employmentDays/dto/update-employment-days-status.dto';
import { UpdateEmploymentDaysDto } from '@api/employmentDays/dto/update-employment-days.dto';
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
  ): Promise<EmploymentDays[]> {
    return this.employmentDaysService.getEmploymentDays(filterDto);
  }

  @Get()
  getEmploymentDays(
    @Query() filterDto: GetEmploymentDto,
  ): Promise<EmploymentDays[]> {
    return this.employmentDaysService.getEmploymentDays(filterDto);
  }

  @Post()
  createEmploymentPeriods(
    @Body() createEmploymentDto: CreateEmploymentDaysDto,
    @GetEmploymentPeriods() employmentPeriods: EmploymentPeriods,
    @GetUser() user: User,
  ): Promise<EmploymentDays> {
    return this.employmentDaysService.createEmploymentDay(
      createEmploymentDto,
      employmentPeriods,
      user,
    );
  }

  @Patch('/:id/status')
  updateEmploymentDayStatus(
    @Param('id') id: string,
    @Body() updateEmploymentDayStatusDto: UpdateEmploymentDaysStatusDto,
  ): Promise<EmploymentDays> {
    const { status } = updateEmploymentDayStatusDto;
    return this.employmentDaysService.updateEmploymentDaysStatus(id, status);
  }

  @Patch('/:id')
  updateEmploymentDay(
    @Param('id') id: string,
    @Body() updateEmploymentDayDto: UpdateEmploymentDaysDto,
  ): Promise<EmploymentDays> {
    return this.employmentDaysService.updateEmploymentDay(
      id,
      updateEmploymentDayDto,
    );
  }

  @Delete('/:id')
  deleteEmploymentDay(@Param('id') id: string): Promise<void> {
    return this.employmentDaysService.deleteEmploymentDay(id);
  }
}
