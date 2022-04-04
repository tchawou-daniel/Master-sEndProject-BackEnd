import { Repository } from "typeorm";
import { Company } from "@api/company/company.entity";
import { GetCompaniesFilterDto } from "@api/company/dto/get-companies-filter.dto";
import { User } from "@api/auth/user.entity";
import { CreateCompanyDto } from "@api/company/dto/create-company.dto";
export declare class CompanyRepository extends Repository<Company> {
    getCompanies(filterDto: GetCompaniesFilterDto, user: User): Promise<Company[]>;
    createCompany(createTaskDto: CreateCompanyDto, user: User): Promise<Company>;
}
