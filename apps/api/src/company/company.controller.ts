import { CheckAbilities } from '@api/ability/abilities.decorator';
import { AbilityFactory, Action } from '@api/ability/ability.factory';
import { GetUser } from '@api/auth/get-user.decorator';
import { User } from '@api/auth/user.entity';
import { Company } from '@api/company/company.entity';
import { CompanyService } from '@api/company/company.service';
import { CreateCompanyDto } from '@api/company/dto/create-company.dto';
import { GetCompaniesFilterDto } from '@api/company/dto/get-companies-filter.dto';
import { UpdateCompanyHiringStatusDto } from '@api/company/dto/update-company-hiring-status.dto';
import { UpdateCompanyDto } from '@api/company/dto/update-company.dto';
import { UsersWorkForCompaniesService } from '@api/usersWorkForCompanies/usersWorkForCompanies.service';
import { ForbiddenError } from '@casl/ability';
import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { isEqual } from 'lodash';

@Controller('/api/v0/company')
@UseGuards(AuthGuard())
export class CompanyController {
  private logger = new Logger('CompanyController');

  // eslint-disable-next-line prettier/prettier
  // @Inject(forwardRef(() => UsersWorkForCompaniesService))  private usersWorkForCompaniesService: UsersWorkForCompaniesService,

  constructor(
    private companyService: CompanyService,
    private abilityFactory: AbilityFactory,
    private usersWorkForCompaniesService: UsersWorkForCompaniesService,
  ) {}

  // Get all companies
  @Get('/')
  @CheckAbilities({ action: Action.Read_All, subject: User })
  getCompanies(
    @Query() filterDto: GetCompaniesFilterDto,
    @GetUser() user: User,
  ): Promise<Company[]> {
    const ability = this.abilityFactory.defineAbility(user);
    try {
      ForbiddenError.from(ability).throwUnlessCan(Action.Read_All, User);
      return this.companyService.getCompanies(filterDto);
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
    }
  }

  // Companies where the current user works
  @Get('/current_user_works')
  @CheckAbilities({
    action: Action.Read,
    subject: User,
  })
  async getMyOwnedCompanies(
    @Query() filterDto: GetCompaniesFilterDto,
    @GetUser() user: User,
  ): Promise<Company[]> {
    const usersWorkForCompaniesForAnUser =
      await this.usersWorkForCompaniesService.getUsersWorkForCompanies(user);
    if (usersWorkForCompaniesForAnUser.length === 0) {
      return [];
    }

    const companies = await this.companyService.getCompanies(filterDto);

    const res = companies.filter((currentUsersCompany) => {
      return usersWorkForCompaniesForAnUser.find((uwfc) => {
        return uwfc.companyId === currentUsersCompany.id;
      });
    });

    // companies.filter(currentUsersCompany => currentUsersCompany.includes(usersWorkForCompanies));
    // employees.filter(u => !assignedUserIds.includes(u.id))
    this.logger.verbose(
      `"User ${
        user.firstName
      }" retrieving all company Filters: ${JSON.stringify(res)}`,
    );
    return res;
  }

  // Get all the companies create by the current user
  @Get('/createdbycurrent_user/')
  @CheckAbilities({ action: Action.Read, subject: User })
  getAllCompanyCreatedByTheCurrentUser(
    @Query() filterDto: GetCompaniesFilterDto,
    @GetUser() user: User,
  ) {
    return this.companyService.getCompanies(filterDto, user);
  }

  // Get id of companies created by current user
  @Get('/:id')
  @CheckAbilities({ action: Action.Read, subject: User })
  getCompanyById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Company> {
    this.logger.verbose(`user: ${JSON.stringify(user)}`);
    const ability = this.abilityFactory.defineAbility(user);
    try {
      ForbiddenError.from(ability).throwUnlessCan(Action.Read, User);
      return this.companyService.getCompanyById(id, user);
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
    }
  }

  // Get all companies created by a specific user
  @Get('/createdby_specific_user/:id')
  @CheckAbilities({
    action: Action.Read_All_CreatedBy_SpecificUser,
    subject: User,
  })
  getCompaniesCreatedByASpecificUser(
    @Param('id') id: string, // Id of the user
    @GetUser() user: User,
  ): Promise<Company[]> {
    const ability = this.abilityFactory.defineAbility(user);
    try {
      ForbiddenError.from(ability).throwUnlessCan(
        Action.Read_All_CreatedBy_SpecificUser,
        User,
      );

      return this.companyService.getCompaniesCreatedByASpecificUser(id);
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
    }
  }

  // Create a company
  @Post('/')
  @CheckAbilities({ action: Action.Create, subject: User })
  createCompany(
    @Body() createCompanyDto: CreateCompanyDto,
    @GetUser() user: User,
  ): Promise<Company> {
    const ability = this.abilityFactory.defineAbility(user);
    this.logger.verbose(createCompanyDto);
    try {
      ForbiddenError.from(ability).throwUnlessCan(Action.Create, User);
      return this.companyService.createCompany(createCompanyDto, user);
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
    }
  }

  // Update the company
  @Patch('/:id')
  @CheckAbilities({ action: Action.Update, subject: User })
  updateCompany(
    @Param('id') id: string,
    @GetUser() user: User,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    const ability = this.abilityFactory.defineAbility(user);
    try {
      ForbiddenError.from(ability).throwUnlessCan(Action.Create, User);
      return this.companyService.updateCompany(id, updateCompanyDto, user);
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
    }
  }

  // Update the company status
  @Patch('/:id/status')
  @CheckAbilities({ action: Action.Update, subject: User })
  updateCompanyHiringStatus(
    @Param('id') id: string,
    @GetUser() user: User,
    @Body() updateCompanyHiringStatusDto: UpdateCompanyHiringStatusDto,
  ): Promise<Company> {
    const ability = this.abilityFactory.defineAbility(user);
    try {
      ForbiddenError.from(ability).throwUnlessCan(Action.Create, User);
      const { hiringStatus } = updateCompanyHiringStatusDto;
      return this.companyService.updateCompanyHiringStatus(
        id,
        hiringStatus,
        user,
      );
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
    }
  }
}
