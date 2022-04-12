import { User } from '@api/auth/user.entity';
import { Company } from '@api/company/company.entity';
import { CompanyService } from '@api/company/company.service';
import { CreateCompanyDto } from '@api/company/dto/create-company.dto';
import { GetCompaniesFilterDto } from '@api/company/dto/get-companies-filter.dto';
export declare class CompanyController {
    private companyService;
    private logger;
    constructor(companyService: CompanyService);
    getCompanies(filterDto: GetCompaniesFilterDto, user: User): Promise<Company[]>;
    createCompany(createCompanyDto: CreateCompanyDto, user: User): Promise<Company>;
}
