import { GetUser } from '@api/auth/get-user.decorator';
import { User } from '@api/auth/user.entity';
import { CompanyService } from '@api/company/company.service';
import { GetUsersWorkForComponiesFilterDto } from '@api/usersWorkForCompanies/dto/get-usersWorkForComponaies-filter.dto';
import { UsersWorkForCompanies } from '@api/usersWorkForCompanies/usersWorkForCompanies.entity';
import { UsersWorkForCompaniesService } from '@api/usersWorkForCompanies/usersWorkForCompanies.service';
import {
  Controller,
  Get,
  Logger,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('usersWorkForCompanies')
@UseGuards(AuthGuard())
export class UsersWorkForCompaniesController {
  private logger = new Logger('UsersWorkForCompaniesController');

  constructor(
    private usersWorkForCompaniesService: UsersWorkForCompaniesService,
    private companyService: CompanyService,
  ) {}

  @Get()
  getUsersWorkForCompanies(
    @Query() filterDto: GetUsersWorkForComponiesFilterDto,
    @GetUser() user: User,
  ): Promise<UsersWorkForCompanies[]> {
    this.logger.verbose(
      `"User ${
        user.firstName
      }" retrieving all users work for companies Filters: ${JSON.stringify(
        filterDto,
      )}`,
    );
    return this.usersWorkForCompaniesService.getUsersWorkForCompanies(
      filterDto,
      user,
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

    return this.getUsersWorkForCompanies(filterDto, user);
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
}
