import { GetUser } from '@api/auth/get-user.decorator';
import { User } from '@api/auth/user.entity';
import { Company } from '@api/company/company.entity';
import { GetCompany } from '@api/company/get-company.decorator';
import { EmploymentDto } from '@api/employment/dto/employment.dto';
import { GetEmploymentsFilterDto } from '@api/employment/dto/get-employments-filter.dto';
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

@Controller('/api/v0/employment')
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

  @Get('/admin/employmentByCompanyId/')
  getEmploymentsByCompanyIdFromAdminUser(
    @Param('id') id: string,
    @Query() filterDto: GetEmploymentsFilterDto,
    @GetCompany() company,
    @GetUser() createdBy: User,
  ): Promise<Employment[]> {
    return this.employmentService.getEmploymentsByCompanyId(
      id,
      filterDto,
      createdBy,
      company,
    );
  }

  // all employment create by the current user
  @Get()
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

  // getEmploymentByCompanyId create by the current user
  @Get()
  getEmploymentsByCompanyId(
    @Param('id') id: string,
    @Query() filterDto: GetEmploymentsFilterDto,
    @GetCompany() company,
    @GetUser() createdBy: User,
  ): Promise<Employment[]> {
    return this.employmentService.getEmploymentsByCompanyId(
      id,
      filterDto,
      createdBy,
      company,
    );
  }

  @Post()
  createEmployment(
    @Body() createEmploymentDto: EmploymentDto,
    @GetUser() user: User,
    @GetCompany() company: Company,
  ): Promise<Employment> {
    return this.employmentService.createEmployment(
      createEmploymentDto,
      user,
      company,
    );
  }

  // check the rights in the front end if the job belongs to the user's
  // company and if the user has the rights. Or if the user is admin
  @Delete('/:id')
  deleteEmployment(@Param('id') id: string): Promise<void> {
    return this.employmentService.deleteEmployment(id);
  }

  // check the rights in the front end if the job belongs to the user's
  // company and if the user has the rights. Or if the user is admin
  @Patch('/:id')
  updateEmploymentStatus(
    @Param('id') id: string,
    @GetUser() createdUser: User,
    @GetCompany() company: Company,
  ): Promise<Employment> {
    if (createdUser !== null) {
      return this.employmentService.updateEmploymentStatus(
        id,
        company,
        createdUser,
      );
    }
  }
}
