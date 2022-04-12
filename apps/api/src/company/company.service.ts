import { User } from '@api/auth/user.entity';
import { Company } from '@api/company/company.entity';
import { CompanyRepository } from '@api/company/company.repository';
import { CreateCompanyDto } from '@api/company/dto/create-company.dto';
import { GetCompaniesFilterDto } from '@api/company/dto/get-companies-filter.dto';
import { Get, Injectable, NotFoundException, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEqual } from 'lodash';

import { UserRole } from '../../common/types/user';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyRepository)
    private companyRepository: CompanyRepository,
  ) {}

  @Get()
  getCompanies(
    filterDto: GetCompaniesFilterDto,
    user: User,
  ): Promise<Company[]> {
    console.log(user);
    return this.companyRepository.getCompanies(filterDto, user);
  }

  async getCompanyById(id: string, user: User): Promise<Company> {
    const found = await this.companyRepository.findOne({ where: { id, user } });
    if (!found) {
      throw new NotFoundException(`Company with ID "${id}" not found`);
    }
    return found;
  }

  async getCompanyByName(
    companyName: string,
    user: User,
  ): Promise<Company> {
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

  // async deleteCompany(id: string, user: User): Promise<void> {
  //     const result = await this.companyRepository.delete({id, user});
  //     if (result.affected === 0) {
  //         throw new NotFoundException(`Company with ID "${id}" not found`);
  //     }
  // }
}
