import { User } from '@api/auth/user.entity';
import { Company } from '@api/company/company.entity';
import { GetUsersWorkForComponiesFilterDto } from '@api/usersWorkForCompanies/dto/get-usersWorkForComponaies-filter.dto';
import { UsersWorkForCompanies } from '@api/usersWorkForCompanies/usersWorkForCompanies.entity';
import { Repository } from 'typeorm';
export declare class UsersWorkForCompaniesRepository extends Repository<UsersWorkForCompanies> {
    getUsersWorkForCompanies(filterDto: GetUsersWorkForComponiesFilterDto, user: User): Promise<UsersWorkForCompanies[]>;
    getMyOwnCompanies(filterDto: GetUsersWorkForComponiesFilterDto, user: User): Promise<UsersWorkForCompanies[]>;
    getWorkerOfMyCompany(filterDto: GetUsersWorkForComponiesFilterDto, company: Company, usersWorkForCompanies: UsersWorkForCompanies, user: User): Promise<UsersWorkForCompanies[]>;
}
