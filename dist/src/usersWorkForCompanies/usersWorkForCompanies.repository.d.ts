import { User } from '@api/auth/user.entity';
import { CreateUsersWorkForCompaniesDto } from '@api/usersWorkForCompanies/dto/create-usersWorkForCompanies.dto';
import { GetUsersWorkForComponiesFilterDto } from '@api/usersWorkForCompanies/dto/get-usersWorkForComponaies-filter.dto';
import { UsersWorkForCompanies } from '@api/usersWorkForCompanies/usersWorkForCompanies.entity';
import { Repository } from 'typeorm';
export declare class UsersWorkForCompaniesRepository extends Repository<UsersWorkForCompanies> {
    private logger;
    getUsersWorkForCompanies(filterDto?: GetUsersWorkForComponiesFilterDto, user?: User): Promise<UsersWorkForCompanies[]>;
    getUsersWorkForASpecificCompany(companyId: string): Promise<UsersWorkForCompanies[]>;
    createUsersWorkForComany(createUsersWorkForCompanies: CreateUsersWorkForCompaniesDto, user: User): Promise<UsersWorkForCompanies>;
    getUserWorkForCompanyByIds(companyId: string, userId: string): Promise<UsersWorkForCompanies>;
    deleteAUserCompany(userId: string, companyId: string, user: User): Promise<void>;
}
