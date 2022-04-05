import { TestDto } from '@api/shared/dto/test.dto';
import { CompanySector, CompanyStatus, Hiring } from '../../../common/types/company';
export declare class CreateCompanyDto extends TestDto {
    readonly companyStatus: CompanyStatus;
    readonly country: string;
    readonly town: string;
    readonly street: string;
    readonly zipCode: string;
    readonly description: string;
    readonly companySector: CompanySector;
    readonly hiringStatus: Hiring;
    readonly clearedAt: Date;
}
