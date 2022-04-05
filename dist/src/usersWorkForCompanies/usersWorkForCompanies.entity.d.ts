import { User } from '@api/auth/user.entity';
import { Company } from '@api/company/company.entity';
import { BaseEntity } from '@api/shared/entities/base.entity';
export declare class UsersWorkForCompanies extends BaseEntity {
    userId: number;
    companyId: number;
    scoreCompany: number;
    companyReviews: string;
    workerReviews: string;
    user: User;
    company: Company;
}
