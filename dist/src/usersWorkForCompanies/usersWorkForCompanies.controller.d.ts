import { User } from '@api/auth/user.entity';
import { CreateUsersWorkForCompaniesDto } from '@api/usersWorkForCompanies/dto/create-usersWorkForCompanies.dto';
import { GetUsersWorkForComponiesFilterDto } from '@api/usersWorkForCompanies/dto/get-usersWorkForComponaies-filter.dto';
import { UpdateUsersWorkForCompaniesDto } from '@api/usersWorkForCompanies/dto/update-usersWorkForCompanies.dto';
import { UsersWorkForCompanies } from '@api/usersWorkForCompanies/usersWorkForCompanies.entity';
import { UsersWorkForCompaniesService } from '@api/usersWorkForCompanies/usersWorkForCompanies.service';
export declare class UsersWorkForCompaniesController {
    private usersWorkForCompaniesService;
    private logger;
    constructor(usersWorkForCompaniesService: UsersWorkForCompaniesService);
    getUsersWorkForCompanies(user: User, filterDto?: GetUsersWorkForComponiesFilterDto): Promise<UsersWorkForCompanies[]>;
    getUserWorkForCompaniesById(id: string, user: User): Promise<UsersWorkForCompanies>;
    getUsersWorkForASpecificCompany(filterDto: GetUsersWorkForComponiesFilterDto, user: User, companyId: string): Promise<UsersWorkForCompanies[]>;
    getASpecificUserWorkForCompany(filterDto: GetUsersWorkForComponiesFilterDto, user: User, companyId: string, userId: string): Promise<UsersWorkForCompanies>;
    createUsersWorkForCompany(createUsersWorkForCompaniesDto: CreateUsersWorkForCompaniesDto, user: User): Promise<UsersWorkForCompanies>;
    updateUsersWorkForCompany(updateEmploymentPeriodDto: UpdateUsersWorkForCompaniesDto, user: User, id: string): Promise<UsersWorkForCompanies>;
    delete(user: User, companyId: string, userId: string): Promise<void>;
}
