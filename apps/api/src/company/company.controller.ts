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
import { ForbiddenError } from '@casl/ability';
import {
  Body,
  Controller, ForbiddenException,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('/api/v0/company')
@UseGuards(AuthGuard())
export class CompanyController {
  private logger = new Logger('CompanyController');

  constructor(
    private companyService: CompanyService,
    private abilityFactory: AbilityFactory,
  ) {}

  // company create by User
  @Get('/')
  getMyOwnedCompanies(
    @Query() filterDto: GetCompaniesFilterDto,
    @GetUser() user: User,
  ): Promise<Company[]> {
    this.logger.verbose(
      `"User ${
        user.firstName
      }" retrieving all company Filters: ${JSON.stringify(filterDto)}`,
    );
    return this.companyService.getCompanies(filterDto, user);
  }

  /// /////////////////// check if it's an admin
  @Get()
  getCompanies(@Query() filterDto: GetCompaniesFilterDto): Promise<Company[]> {
    return this.companyService.getCompanies(filterDto);
  }

  // retrieve just the company he created (((( vérifier après))))
  @Get('/:id')
  getCompanyById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Company> {
    return this.companyService.getCompanyById(id, user);
  }

  @Post()
  @CheckAbilities({ action: Action.Delete, subject: User })
  createCompany(
    @Body() createCompanyDto: CreateCompanyDto,
    @GetUser() user: User,
  ): Promise<Company> {
    const ability = this.abilityFactory.defineAbility(user);
    try {
      ForbiddenError.from(ability).throwUnlessCan(Action.Create, User);
      return this.companyService.createCompany(createCompanyDto, user);
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
    }
  }

  @Patch('/:id')
  updateCompany(
    @Param('id') id: string,
    @GetUser() user: User,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    return this.companyService.updateCompany(id, updateCompanyDto, user);
  }

  @Patch('/:id/status')
  updateCompanyHiringStatus(
    @Param('id') id: string,
    @GetUser() user: User,
    @Body() updateCompanyHiringStatusDto: UpdateCompanyHiringStatusDto,
  ): Promise<Company> {
    const { hiringStatus } = updateCompanyHiringStatusDto;
    return this.companyService.updateCompanyHiringStatus(
      id,
      hiringStatus,
      user,
    );
  }
}
