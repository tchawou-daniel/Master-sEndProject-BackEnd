import { GetUser } from '@api/auth/get-user.decorator';
import { User } from '@api/auth/user.entity';
import { GetCompany } from '@api/company/get-company.decorator';
import { CreateEmploymentDto } from '@api/employment/dto/create-employment.dto';
import { GetEmploymentsFilterDto } from '@api/employment/dto/get-employments-filter.dto';
import { UpdateEmploymentStatusDto } from '@api/employment/dto/update-employment-status.dto';
import { UpdateEmploymentDto } from '@api/employment/dto/update-employment.dto';
import { Employment } from '@api/employment/employment.entity';
import { EmploymentService } from '@api/employment/employment.service';
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

@Controller('/api/v0')
@UseGuards(AuthGuard())
export class EmploymentController {
  private logger = new Logger('EmploymentController');

  constructor(private employmentService: EmploymentService) {}

  @Get('/admin/employments')
  getEmploymentsFromAdminUser(@Query() filterDto: GetEmploymentsFilterDto) {
    this.logger.verbose(
      `"User admin retrieving all employments Filters: ${JSON.stringify(
        filterDto,
      )}`,
    );
    return this.employmentService.getEmployments(filterDto);
  }

  @Get('/admin/employment/:id')
  getEmploymentsByCompanyIdFromAdminUser(
    @Param('id') id: string,
    @Query() filterDto: GetEmploymentsFilterDto,
    @GetCompany() company,
  ): Promise<Employment[]> {
    return this.employmentService.getEmploymentsByCompanyId(
      id,
      filterDto,
      company,
    );
  }

  // all employment create by the current user
  @Get('/employment')
  getEmployments(
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

  @Get('/employment/:id')
  getEmploymentsById(
    @Param('id') id: string,
    @Query() filterDto: GetEmploymentsFilterDto,
    @GetCompany() company,
    @GetUser() createdBy: User,
  ): Promise<Employment[]> {
    return this.employmentService.getEmploymentsByCompanyId(
      id,
      filterDto,
      company,
      createdBy,
    );
  }

  // getEmploymentByCompanyId create by the current user
  @Get('/employment')
  getEmploymentsByCompanyId(
    @Param('id') id: string,
    @Query() filterDto: GetEmploymentsFilterDto,
    @GetCompany() company,
    @GetUser() createdBy: User,
  ): Promise<Employment[]> {
    return this.employmentService.getEmploymentsByCompanyId(
      id,
      filterDto,
      company,
      createdBy,
    );
  }

  @Post('/employment')
  createEmployment(
    @Body() createEmploymentDto: CreateEmploymentDto,
    @GetUser() user: User,
  ): Promise<Employment> {
    return this.employmentService.createEmployment(createEmploymentDto, user);
  }

  // check the rights in the front end if the job belongs to the user's
  // company and if the user has the rights. Or if the user is admin
  @Patch('/employment/:id/status')
  updateEmploymentStatus(
    @Param('id') id: string,
    @Body() updateEmploymentStatusDto: UpdateEmploymentStatusDto,
  ): Promise<Employment> {
    const { hiringStatus } = updateEmploymentStatusDto;
    this.logger.verbose(hiringStatus);
    return this.employmentService.updateEmploymentStatus(id, hiringStatus);
  }

  @Patch('/employment')
  updateEmployment(
    @Param('id') id: string,
    @Body() updateEmploymentDto: UpdateEmploymentDto,
  ): Promise<Employment> {
    return this.employmentService.updateEmployment(id, updateEmploymentDto);
  }

  // check the rights in the front end if the job belongs to the user's
  // company and if the user has the rights. Or if the user is admin
  @Delete('/employment/:id')
  deleteEmployment(@Param('id') id: string): Promise<void> {
    return this.employmentService.deleteEmployment(id);
  }
}
