import { User } from '@api/auth/user.entity';
import { Company } from '@api/company/company.entity';
import { CompanyRepository } from '@api/company/company.repository';
import { CreateCompanyDto } from '@api/company/dto/create-company.dto';
import { GetCompaniesFilterDto } from '@api/company/dto/get-companies-filter.dto';
import { UpdateCompanyDto } from '@api/company/dto/update-company.dto';
import { Get, Injectable, NotFoundException, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEqual } from 'lodash';

import { Hiring } from '../../common/types/company';
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

  // async deleteCompany(id: string, user: User): Promise<void> {
  //     const result = await this.companyRepository.delete({id, user});
  //     if (result.affected === 0) {
  //         throw new NotFoundException(`Company with ID "${id}" not found`);
  //     }
  // }
}
