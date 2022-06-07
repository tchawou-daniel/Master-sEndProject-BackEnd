import { User } from '@api/auth/user.entity';
import { Company } from '@api/company/company.entity';
import { BaseEntity } from '../SHARED/entities/base.entity';
export declare class UsersWorkForCompanies extends BaseEntity {
    userId: string;
    companyId: string;
    scoreCompany: number;
    companyReviews: number;
    workerReviews: number;
    user: User;
    company: Company;
}
