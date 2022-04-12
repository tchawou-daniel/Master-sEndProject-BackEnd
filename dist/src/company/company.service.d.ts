import { User } from '@api/auth/user.entity';
import { Company } from '@api/company/company.entity';
import { CompanyRepository } from '@api/company/company.repository';
import { CreateCompanyDto } from '@api/company/dto/create-company.dto';
import { GetCompaniesFilterDto } from '@api/company/dto/get-companies-filter.dto';
export declare class CompanyService {
    private companyRepository;
    constructor(companyRepository: CompanyRepository);
    getCompanies(filterDto: GetCompaniesFilterDto, user: User): Promise<Company[]>;
    getCompanyById(id: string, user: User): Promise<Company>;
    getCompanyByName(companyName: string, user: User): Promise<Company>;
    createCompany(createCompanyDto: CreateCompanyDto, user: User): Promise<Company>;
}
