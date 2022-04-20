import { User } from '@api/auth/user.entity';
import { CompanyService } from '@api/company/company.service';
import { CreateUsersWorkForCompaniesDto } from '@api/usersWorkForCompanies/dto/create-usersWorkForCompanies.dto';
import { GetUsersWorkForComponiesFilterDto } from '@api/usersWorkForCompanies/dto/get-usersWorkForComponaies-filter.dto';
import { UpdateUsersWorkForCompaniesDto } from '@api/usersWorkForCompanies/dto/update-usersWorkForCompanies.dto';
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
    createUsersWorkForCompany(createUsersWorkForCompaniesDto: CreateUsersWorkForCompaniesDto, user: User): Promise<UsersWorkForCompanies>;
    updateUsersWorkForCompany(updateEmploymentPeriodDto: UpdateUsersWorkForCompaniesDto, user: User, id: string): Promise<UsersWorkForCompanies>;
}
