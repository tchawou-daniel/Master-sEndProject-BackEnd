import { CompanyRepository } from "@api/company/company.repository";
import { GetCompaniesFilterDto } from "@api/company/dto/get-companies-filter.dto";
import { Company } from "@api/company/company.entity";
import { User } from "@api/auth/user.entity";
import { CreateCompanyDto } from "@api/company/dto/create-company.dto";
export declare class CompanyService {
    private companyRepository;
    constructor(companyRepository: CompanyRepository);
    getCompanies(filterDto: GetCompaniesFilterDto, user: User): Promise<Company[]>;
    getCompanyById(id: string, user: User): Promise<Company>;
    createCompany(createCompanyDto: CreateCompanyDto, user: User): Promise<Company>;
}
