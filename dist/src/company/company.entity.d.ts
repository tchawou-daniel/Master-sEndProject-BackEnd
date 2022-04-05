import { User } from '@api/auth/user.entity';
import { BaseEntity } from '@api/shared/entities/base.entity';
import { UsersWorkForCompanies } from '@api/usersWorkForCompanies/usersWorkForCompanies.entity';
import { CompanySector, CompanyStatus, Hiring } from '../../common/types/company';
export declare class Company extends BaseEntity {
    name: string;
    companyStatus?: CompanyStatus;
    country: string;
    town: string;
    street: string;
    zipCode: string;
    description: string;
    companySector?: CompanySector;
    hiringStatus: Hiring;
    clearedAt: Date;
    user: User;
    usersWorkForCompanies: UsersWorkForCompanies[];
}
