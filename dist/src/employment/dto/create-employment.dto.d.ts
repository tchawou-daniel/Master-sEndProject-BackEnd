import { Company } from '@api/company/company.entity';
import { EmploymentSector, Hiring } from '../../../common/types/employment';
export declare class CreateEmploymentDto {
    readonly name: string;
    readonly description: string;
    readonly country: string;
    readonly town: string;
    readonly street: string;
    readonly zipCode: string;
    readonly employmentSector: EmploymentSector;
    readonly hiringStatus: Hiring;
    readonly clearedAt: Date;
    readonly updatedAt: Date;
    readonly createdAt: Date;
    readonly hasManySubsidiaries: boolean;
    readonly company: Company;
}
