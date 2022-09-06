import { User } from '@api/auth/user.entity';
import { Company } from '@api/company/company.entity';
import { CompanyRepository } from '@api/company/company.repository';
import { CreateCompanyDto } from '@api/company/dto/create-company.dto';
import { GetCompaniesFilterDto } from '@api/company/dto/get-companies-filter.dto';
import { UpdateCompanyDto } from '@api/company/dto/update-company.dto';
import {
  ForbiddenException,
  Get,
  Injectable,
  Logger,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEqual } from 'lodash';

import { CompanyStatus, Hiring } from '../../common/types/company';
import { UserRole } from '../../common/types/user';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyRepository)
    private companyRepository: CompanyRepository,
  ) {}

  @Get()
  getCompanies(
    filterDto?: GetCompaniesFilterDto,
    user?: User,
  ): Promise<Company[]> {
    if (user) {
      return this.companyRepository.getCompanies(filterDto, user);
    }
    return this.companyRepository.getCompanies(filterDto);
  }

  async getCompanyById(id: string, user: User): Promise<Company> {
    const found = await this.companyRepository.findOne({ where: { id, user } });

    if (!found) {
      throw new NotFoundException(`Company with ID "${id}" not found`);
    }
    return found;
  }

  async getCompaniesCreatedByASpecificUser(user: string) {
    const found =
      await this.companyRepository.getCompaniesCreatedByAspecificUser(user);
    if (!found) {
      throw new NotFoundException(`Company of the user "${user}" not found`);
    }
    return found;
  }

  async getCompanyByName(companyName: string, user: User): Promise<Company> {
    if (
      !isEqual(UserRole.PERMANENT_WORKER, user.role) ||
      !isEqual(UserRole.TEMPORARY_WORKER, user.role)
    ) {
      const idFound = await this.companyRepository.findOne({
        where: { companyName },
      });
      if (!idFound) {
        throw new NotFoundException(
          `Company id with name "${companyName}" not found`,
        );
      }
      return idFound;
    }
    throw new NotFoundException(`ERROR 404`);
  }

  @Post()
  createCompany(
    createCompanyDto: CreateCompanyDto,
    user: User,
  ): Promise<Company> {
    return this.companyRepository.createCompany(createCompanyDto, user);
  }

  async updateCompany(
    id: string,
    updateCompanyDto: UpdateCompanyDto,
    user?: User,
  ): Promise<Company> {
    const company = await this.getCompanyById(id, user);
    company.name = updateCompanyDto.name;
    company.companyStatus = updateCompanyDto.companyStatus;
    company.country = updateCompanyDto.country;
    company.town = updateCompanyDto.town;
    company.street = updateCompanyDto.street;
    company.zipCode = updateCompanyDto.zipCode;
    company.description = updateCompanyDto.description;
    company.companySector = updateCompanyDto.companySector;
    company.hiringStatus = updateCompanyDto.hiringStatus;
    await this.companyRepository.save(company);

    return company;
  }

  async updateCompanyHiringStatus(
    id: string,
    hiringStatus: Hiring,
    user?: User,
  ): Promise<Company> {
    const company = await this.getCompanyById(id, user);
    company.hiringStatus = hiringStatus;
    await this.companyRepository.save(company);

    return company;
  }

  async findById(id: string, user: User): Promise<Company> {
    return this.companyRepository.findOne({ where: { id, user } });
  }

  async delete(id: string, user: User): Promise<void> {
    const company = await this.findById(id, user);
    Logger.log({ company });
    if (company.companyStatus !== CompanyStatus.INACTIVE) {
      throw new ForbiddenException(
        'Company is still ACTIVE. Only INACTIVE companies can be deleted',
      );
    }
    await this.companyRepository.delete(id);
  }
}
