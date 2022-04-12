import { User } from '@api/auth/user.entity';
import { Company } from '@api/company/company.entity';
import { EmploymentPeriods } from '@api/employmentPeriods/employmentPeriods.entity';
import { EmploymentSector, Hiring } from '../../common/types/employment';
import { BaseEntity } from '../SHARED/entities/base.entity';
export declare class Employment extends BaseEntity {
    name: string;
    description: string;
    country: string;
    town: string;
    street: string;
    zipCode: string;
    hiringStatus: Hiring;
    clearedAt: Date;
    companyName: Date;
    hasManySubsidiaries: boolean;
    employmentSector: EmploymentSector;
    company: Company;
    employmentPeriods: EmploymentPeriods[];
    createdBy: User;
}
