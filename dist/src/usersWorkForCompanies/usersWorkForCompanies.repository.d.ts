import { Company } from '@api/company/company.entity';
import { GetUsersWorkForComponaiesFilterDto } from '@api/usersWorkForCompanies/dto/get-usersWorkForComponaies-filter.dto';
import { UsersWorkForCompanies } from '@api/usersWorkForCompanies/usersWorkForCompanies.entity';
import { Repository } from 'typeorm';
export declare class UsersWorkForCompaniesRepository extends Repository<UsersWorkForCompanies> {
    getUsersWorkForCompanies(filterDto: GetUsersWorkForComponaiesFilterDto, company: Company): Promise<UsersWorkForCompanies[]>;
}
