import { User } from '@api/auth/user.entity';
import { Company } from '@api/company/company.entity';
import { CompanyService } from '@api/company/company.service';
import { CreateCompanyDto } from '@api/company/dto/create-company.dto';
import { GetCompaniesFilterDto } from '@api/company/dto/get-companies-filter.dto';
import { UpdateCompanyHiringStatusDto } from '@api/company/dto/update-company-hiring-status.dto';
import { UpdateCompanyDto } from '@api/company/dto/update-company.dto';
export declare class CompanyController {
    private companyService;
    private logger;
    constructor(companyService: CompanyService);
    getMyOwnedCompanies(filterDto: GetCompaniesFilterDto, user: User): Promise<Company[]>;
    getCompanies(filterDto: GetCompaniesFilterDto): Promise<Company[]>;
    getCompanyById(id: string, user: User): Promise<Company>;
    createCompany(createCompanyDto: CreateCompanyDto, user: User): Promise<Company>;
    updateCompany(id: string, user: User, updateCompanyDto: UpdateCompanyDto): Promise<Company>;
    updateCompanyHiringStatus(id: string, user: User, updateCompanyHiringStatusDto: UpdateCompanyHiringStatusDto): Promise<Company>;
}
