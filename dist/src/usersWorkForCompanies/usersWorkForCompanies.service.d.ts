import { User } from '@api/auth/user.entity';
import { Company } from '@api/company/company.entity';
import { CreateUsersWorkForCompaniesDto } from '@api/usersWorkForCompanies/dto/create-usersWorkForCompanies.dto';
import { GetUsersWorkForComponiesFilterDto } from '@api/usersWorkForCompanies/dto/get-usersWorkForComponaies-filter.dto';
import { UsersWorkForCompanies } from '@api/usersWorkForCompanies/usersWorkForCompanies.entity';
import { UsersWorkForCompaniesRepository } from '@api/usersWorkForCompanies/usersWorkForCompanies.repository';
export declare class UsersWorkForCompaniesService {
    private usersWorkForCompaniesRepository;
    constructor(usersWorkForCompaniesRepository: UsersWorkForCompaniesRepository);
    getUsersWorkForCompanies(filterDto: GetUsersWorkForComponiesFilterDto, user: User): Promise<UsersWorkForCompanies[]>;
    getUserWorkForCompaniesById(id: string, user: User): Promise<UsersWorkForCompanies>;
    createUsersWorkForCompany(createUsersWorkForCompaniesDto: CreateUsersWorkForCompaniesDto, user: User, company: Company): Promise<UsersWorkForCompanies>;
}
