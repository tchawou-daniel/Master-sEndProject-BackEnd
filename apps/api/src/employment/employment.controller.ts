import { GetUser } from '@api/auth/get-user.decorator';
import { User } from '@api/auth/user.entity';
import { Company } from '@api/company/company.entity';
import { GetCompany } from '@api/company/get-company.decorator';
import { EmploymentDto } from '@api/employment/dto/employment.dto';
import { GetEmploymentsFilterDto } from '@api/employment/dto/get-employments-filter.dto';
import { Employment } from '@api/employment/employment.entity';
import { EmploymentService } from '@api/employment/employment.service';
import { GetEmployment } from '@api/employment/get-employment.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { Hiring } from '../../common/types/employment';

@Controller('/api/v0/employment')
@UseGuards(AuthGuard())
export class EmploymentController {
  private logger = new Logger('EmploymentController');

  constructor(private employmentService: EmploymentService) {}

  @Get()
  getEmployment(
    @Query() filterDto: GetEmploymentsFilterDto,
    @GetUser() user: User,
  ) {
    this.logger.verbose(
      `"User ${
        user.firstName
      }" retrieving all employments Filters: ${JSON.stringify(filterDto)}`,
    );
    return this.employmentService.getEmployments(filterDto, user);
  }

  @Post()
  createEmployment(
    @Body() createEmploymentDto: EmploymentDto,
    @GetUser() user: User,
  ): Promise<Employment> {
    return this.employmentService.createEmployment(createEmploymentDto, user);
  }

  @Delete('/:id')
  deleteEmployment(@Param('id') id: string): Promise<void> {
    return this.employmentService.deleteEmployment(id);
  }

  @Patch('/:id')
  updateEmploymentStatus(
    @Param('id') id: string,
    @GetCompany() company: Company,
  ): Promise<Employment> {
    return this.employmentService.updateEmploymentStatus(id, company);
  }
}
