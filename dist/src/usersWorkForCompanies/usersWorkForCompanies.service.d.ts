import { User } from '@api/auth/user.entity';
import { GetUsersWorkForComponiesFilterDto } from '@api/usersWorkForCompanies/dto/get-usersWorkForComponaies-filter.dto';
import { UsersWorkForCompanies } from '@api/usersWorkForCompanies/usersWorkForCompanies.entity';
import { UsersWorkForCompaniesRepository } from '@api/usersWorkForCompanies/usersWorkForCompanies.repository';
export declare class UsersWorkForCompaniesService {
    private usersWorkForCompaniesRepository;
    constructor(usersWorkForCompaniesRepository: UsersWorkForCompaniesRepository);
    getUsersWorkForCompanies(filterDto: GetUsersWorkForComponiesFilterDto, user: User): Promise<UsersWorkForCompanies[]>;
    getUserWorkForCompaniesById(id: string, user: User): Promise<UsersWorkForCompanies>;
}
