import { User } from '@api/auth/user.entity';
import { BaseEntity } from '@api/shared/entities/base.entity';
import { EmploymentSector, Hiring } from '../../common/types/Employment';
export declare class Employment extends BaseEntity {
    name: string;
    description: string;
    country: string;
    town: string;
    street: string;
    zipCode: string;
    hiringStatus: Hiring;
    readonly clearedAt: Date;
    readonly updateAt: Date;
    readonly companyName: Date;
    readonly hasManySubsidiaries: boolean;
    readonly employementSector: EmploymentSector;
    user: User;
}
