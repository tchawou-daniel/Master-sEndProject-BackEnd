import { EmploymentSector, Hiring } from '../../../common/types/Employment';
export declare class CreateEmploymentDto {
    readonly name: string;
    readonly description: string;
    readonly country: string;
    readonly town: string;
    readonly street: string;
    readonly zipCode: string;
    readonly employementSector: EmploymentSector;
    readonly hiringStatus: Hiring;
    readonly clearedAt: Date;
    readonly updateAt: Date;
    readonly companyName: Date;
    readonly hasManySubsidiaries: boolean;
}
