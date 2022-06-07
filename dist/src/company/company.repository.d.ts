import { User } from '@api/auth/user.entity';
import { Company } from '@api/company/company.entity';
import { CreateCompanyDto } from '@api/company/dto/create-company.dto';
import { GetCompaniesFilterDto } from '@api/company/dto/get-companies-filter.dto';
import { Repository } from 'typeorm';
export declare class CompanyRepository extends Repository<Company> {
    getCompanies(filterDto: GetCompaniesFilterDto, user?: User): Promise<Company[]>;
    getCompaniesCreatedByAspecificUser(idUser: string): Promise<Company[]>;
    createCompany(createCompanyDto: CreateCompanyDto, user: User): Promise<Company>;
}
