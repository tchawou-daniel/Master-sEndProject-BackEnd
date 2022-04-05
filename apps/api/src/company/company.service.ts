import { User } from '@api/auth/user.entity';
import { Company } from '@api/company/company.entity';
import { CompanyRepository } from '@api/company/company.repository';
import { CreateCompanyDto } from '@api/company/dto/create-company.dto';
import { GetCompaniesFilterDto } from '@api/company/dto/get-companies-filter.dto';
import {
  Get, Injectable, NotFoundException, Param, Post,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CompanyService {
  constructor(
        @InjectRepository(CompanyRepository)
        private companyRepository: CompanyRepository,
  ) {}

    @Get()
  getCompanies(filterDto: GetCompaniesFilterDto, user: User):Promise<Company[]> {
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

    @Post()
    createCompany(createCompanyDto: CreateCompanyDto, user: User): Promise<Company> {
      return this.companyRepository.createCompany(createCompanyDto, user);
    }

  // async deleteCompany(id: string, user: User): Promise<void> {
  //     const result = await this.companyRepository.delete({id, user});
  //     if (result.affected === 0) {
  //         throw new NotFoundException(`Company with ID "${id}" not found`);
  //     }
  // }
}
