import { GetUser } from '@api/auth/get-user.decorator';
import { User } from '@api/auth/user.entity';
import { Company } from '@api/company/company.entity';
import { CompanyService } from '@api/company/company.service';
import { CreateCompanyDto } from '@api/company/dto/create-company.dto';
import { GetCompaniesFilterDto } from '@api/company/dto/get-companies-filter.dto';
import {
  Body, Controller, Get, Logger, Post, Query, UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('company')
@UseGuards(AuthGuard())
export class CompanyController {
  private logger = new Logger('CompanyController');

  constructor(private companyService: CompanyService) {}

    @Get()
  getCompanies(
        @Query() filterDto: GetCompaniesFilterDto,
        @GetUser() user: User,
  ): Promise<Company[]> {
    this.logger.verbose(
      `"User ${user.firstName}" retrieving all company Filters: ${JSON.stringify(
        filterDto,
      )}`,
    );
    return this.companyService.getCompanies(filterDto, user);
  }

    @Post()
    createCompany(
        @Body() createCompanyDto: CreateCompanyDto,
        @GetUser() user: User,
    ): Promise<Company> {
      return this.companyService.createCompany(createCompanyDto, user);
    }
}
