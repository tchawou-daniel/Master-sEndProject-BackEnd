import { User } from '@api/auth/user.entity';
import { CompanyService } from '@api/company/company.service';
import { GetUsersWorkForComponiesFilterDto } from '@api/usersWorkForCompanies/dto/get-usersWorkForComponaies-filter.dto';
import { UsersWorkForCompanies } from '@api/usersWorkForCompanies/usersWorkForCompanies.entity';
import { UsersWorkForCompaniesService } from '@api/usersWorkForCompanies/usersWorkForCompanies.service';
export declare class UsersWorkForCompaniesController {
    private usersWorkForCompaniesService;
    private companyService;
    private logger;
    constructor(usersWorkForCompaniesService: UsersWorkForCompaniesService, companyService: CompanyService);
    getUsersWorkForCompanies(filterDto: GetUsersWorkForComponiesFilterDto, user: User): Promise<UsersWorkForCompanies[]>;
    getUserWorkForCompaniesById(id: string, user: User): Promise<UsersWorkForCompanies>;
    getUsersWorkForMyCompany(filterDto: GetUsersWorkForComponiesFilterDto, user: User, id: string): Promise<UsersWorkForCompanies[]>;
}
