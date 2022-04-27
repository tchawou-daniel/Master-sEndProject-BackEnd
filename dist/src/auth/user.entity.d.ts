import { Company } from '@api/company/company.entity';
import { Employment } from '@api/employment/employment.entity';
import { EmploymentDays } from '@api/employmentDays/employmentDays.entity';
import { BaseEntity } from '@api/SHARED/entities/base.entity';
import { UsersWorkForCompanies } from '@api/usersWorkForCompanies/usersWorkForCompanies.entity';
import { WorkerPeriods } from '@api/worker-periods/workerPeriods.entity';
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
    joinedAt: Date;
    lastConnection: Date;
    salary: number;
    companies: Company[];
    employmentDays: EmploymentDays[];
    employments: Employment[];
    workerPeriods: WorkerPeriods[];
    usersWorkForCompanies: UsersWorkForCompanies[];
}
