import { User } from '@api/auth/user.entity';
import { CreateUsersWorkForCompaniesDto } from '@api/usersWorkForCompanies/dto/create-usersWorkForCompanies.dto';
import { GetUsersWorkForComponiesFilterDto } from '@api/usersWorkForCompanies/dto/get-usersWorkForComponaies-filter.dto';
import { UpdateUsersWorkForCompaniesDto } from '@api/usersWorkForCompanies/dto/update-usersWorkForCompanies.dto';
import { UsersWorkForCompanies } from '@api/usersWorkForCompanies/usersWorkForCompanies.entity';
import { UsersWorkForCompaniesRepository } from '@api/usersWorkForCompanies/usersWorkForCompanies.repository';
export declare class UsersWorkForCompaniesService {
    private usersWorkForCompaniesRepository;
    private logger;
    constructor(usersWorkForCompaniesRepository: UsersWorkForCompaniesRepository);
    getUsersWorkForCompanies(user: User, filterDto?: GetUsersWorkForComponiesFilterDto): Promise<UsersWorkForCompanies[]>;
    getUsersWorkForASpecificCompany(companyId: string): Promise<UsersWorkForCompanies[]>;
    getASpecificUserWorkForCompany(companyId: string, userId: string): Promise<UsersWorkForCompanies>;
    getUserWorkForCompaniesById(id: string, user: User): Promise<UsersWorkForCompanies>;
    createUsersWorkForCompany(createUsersWorkForCompaniesDto: CreateUsersWorkForCompaniesDto, user: User): Promise<UsersWorkForCompanies>;
    updateUsersWorkForCompaniesService(id: string, updateUsersWorkForCompaniesDto: UpdateUsersWorkForCompaniesDto, user: User): Promise<UsersWorkForCompanies>;
    delete(userId: string, companyId: string, user: User): Promise<void>;
}
