import { BaseEntity } from "@api/shared/entities/base.entity";
import { CompanySector, CompanyStatus, Hiring } from "../../common/types/company";
import { UsersWorkForCompanies } from "@api/usersWorkForCompanies/usersWorkForCompanies.entity";
import { User } from "@api/auth/user.entity";
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
