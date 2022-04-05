import { Company } from '@api/company/company.entity';
import { Employment } from '@api/employment/employment.entity';
import { BaseEntity } from '@api/shared/entities/base.entity';
import { UsersWorkForCompanies } from '@api/usersWorkForCompanies/usersWorkForCompanies.entity';
import { UserRole, WorkerIntegrationStatus } from '../../common/types/user';
export declare class User extends BaseEntity {
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    role: UserRole;
    workerIntegrationStatus: WorkerIntegrationStatus;
    bio: string;
    avatar: string;
    clearedAt: Date;
    joinAt: Date;
    lastConnection: Date;
    salary: number;
    company: Company[];
    employment: Employment[];
    usersWorkForCompanies: UsersWorkForCompanies[];
}
