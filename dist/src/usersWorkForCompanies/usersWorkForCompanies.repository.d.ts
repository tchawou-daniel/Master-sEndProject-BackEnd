import { Repository } from "typeorm";
import { UsersWorkForCompanies } from "@api/usersWorkForCompanies/usersWorkForCompanies.entity";
import { GetUsersWorkForComponaiesFilterDto } from "@api/usersWorkForCompanies/dto/get-usersWorkForComponaies-filter.dto";
import { Company } from "@api/company/company.entity";
export declare class UsersWorkForCompaniesRepository extends Repository<UsersWorkForCompanies> {
    getUsersWorkForCompanies(filterDto: GetUsersWorkForComponaiesFilterDto, company: Company): Promise<UsersWorkForCompanies[]>;
}
