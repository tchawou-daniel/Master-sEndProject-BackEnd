import { GetUser } from '@api/auth/get-user.decorator';
import { User } from '@api/auth/user.entity';
import { Company } from '@api/company/company.entity';
import { CompanyService } from '@api/company/company.service';
import { GetCompany } from '@api/company/get-company.decorator';
import { Employment } from '@api/employment/employment.entity';
import { CreateEmploymentPeriodsDto } from '@api/employmentPeriods/dto/create-employment-periods.dto';
import { UpdateEmploymentPeriodDto } from '@api/employmentPeriods/dto/update-employment-period.dto';
import { EmploymentPeriods } from '@api/employmentPeriods/employmentPeriods.entity';
import { CreateUsersWorkForCompaniesDto } from '@api/usersWorkForCompanies/dto/create-usersWorkForCompanies.dto';
import { GetUsersWorkForComponiesFilterDto } from '@api/usersWorkForCompanies/dto/get-usersWorkForComponaies-filter.dto';
import { UpdateUsersWorkForCompaniesDto } from '@api/usersWorkForCompanies/dto/update-usersWorkForCompanies.dto';
import { UsersWorkForCompanies } from '@api/usersWorkForCompanies/usersWorkForCompanies.entity';
import { UsersWorkForCompaniesService } from '@api/usersWorkForCompanies/usersWorkForCompanies.service';
import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v0/usersWorkForCompanies')
@UseGuards(AuthGuard())
export class UsersWorkForCompaniesController {
  private logger = new Logger('UsersWorkForCompaniesController');

  constructor(
    private usersWorkForCompaniesService: UsersWorkForCompaniesService,
    private companyService: CompanyService,
  ) {}

  @Get()
  getUsersWorkForCompanies(
    @GetUser() user: User,
    @Query() filterDto?: GetUsersWorkForComponiesFilterDto,
  ): Promise<UsersWorkForCompanies[]> {
    this.logger.verbose(
      `"User ${
        user.firstName
      }" retrieving all users work for companies Filters: ${JSON.stringify(
        filterDto,
      )}`,
    );
    return this.usersWorkForCompaniesService.getUsersWorkForCompanies(
      user,
      filterDto,
    );
  }

  @Get('/:id')
  getUserWorkForCompaniesById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<UsersWorkForCompanies> {
    return this.usersWorkForCompaniesService.getUserWorkForCompaniesById(
      id,
      user,
    );
  }

  @Get('/:id')
  getUsersWorkForMyCompany(
    @Query() filterDto: GetUsersWorkForComponiesFilterDto,
    @GetUser() user: User,
    @Param('id') id: string,
  ): Promise<UsersWorkForCompanies[]> {
    const userWorkForCompanies = this.getUserWorkForCompaniesById(id, user);
    this.logger.verbose(
      `the content of userWorkForCompanies is: ${userWorkForCompanies}`,
    );

    return this.getUsersWorkForCompanies(user, filterDto);
  }
  //
  // @Get('/:id')
  // getWorkerOfMyCompany(
  //   @Query() filterDto: GetUsersWorkForComponiesFilterDto,
  //   @GetCompany() companyService: CompanyService,
  //   @GetUsersWorkForCompaniesService()
  //   usersWorkForCompaniesService: UsersWorkForCompaniesService,
  // ) {
  //   companyService.getCompanyByName();
  //   return this.companyService.getCompanyId();
  // }

  @Post()
  createUsersWorkForCompany(
    @Body() createUsersWorkForCompaniesDto: CreateUsersWorkForCompaniesDto,
    @GetUser() user: User,
  ): Promise<UsersWorkForCompanies> {
    return this.usersWorkForCompaniesService.createUsersWorkForCompany(
      createUsersWorkForCompaniesDto,
      user,
    );
  }

  @Patch('/:id')
  updateUsersWorkForCompany(
    @Body() updateEmploymentPeriodDto: UpdateUsersWorkForCompaniesDto,
    @GetUser() user: User,
    @Param('id') id: string,
  ): Promise<UsersWorkForCompanies> {
    this.logger.verbose({ updateEmploymentPeriodDto });
    return this.usersWorkForCompaniesService.updateUsersWorkForCompaniesService(
      id,
      updateEmploymentPeriodDto,
      user,
    );
  }
}
