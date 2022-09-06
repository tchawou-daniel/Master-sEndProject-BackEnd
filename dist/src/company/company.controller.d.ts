import { AbilityFactory } from '@api/ability/ability.factory';
import { User } from '@api/auth/user.entity';
import { Company } from '@api/company/company.entity';
import { CompanyService } from '@api/company/company.service';
import { CreateCompanyDto } from '@api/company/dto/create-company.dto';
import { GetCompaniesFilterDto } from '@api/company/dto/get-companies-filter.dto';
import { UpdateCompanyHiringStatusDto } from '@api/company/dto/update-company-hiring-status.dto';
import { UpdateCompanyDto } from '@api/company/dto/update-company.dto';
import { UsersWorkForCompaniesService } from '@api/usersWorkForCompanies/usersWorkForCompanies.service';
export declare class CompanyController {
    private companyService;
    private abilityFactory;
    private usersWorkForCompaniesService;
    private logger;
    constructor(companyService: CompanyService, abilityFactory: AbilityFactory, usersWorkForCompaniesService: UsersWorkForCompaniesService);
    getCompanies(filterDto: GetCompaniesFilterDto, user: User): Promise<Company[]>;
    getMyOwnedCompanies(filterDto: GetCompaniesFilterDto, user: User): Promise<Company[]>;
    getAllCompanyCreatedByTheCurrentUser(filterDto: GetCompaniesFilterDto, user: User): Promise<Company[]>;
    getCompanyById(id: string, user: User): Promise<Company>;
    getCompaniesCreatedByASpecificUser(id: string, user: User): Promise<Company[]>;
    createCompany(createCompanyDto: CreateCompanyDto, user: User): Promise<Company>;
    updateCompany(id: string, user: User, updateCompanyDto: UpdateCompanyDto): Promise<Company>;
    updateCompanyHiringStatus(id: string, user: User, updateCompanyHiringStatusDto: UpdateCompanyHiringStatusDto): Promise<Company>;
    delete(user: User, id: string): Promise<void>;
}
