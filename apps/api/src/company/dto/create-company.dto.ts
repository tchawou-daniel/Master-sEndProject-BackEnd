import {IsNotEmpty, IsOptional} from 'class-validator';
import {CompanySector, CompanyStatus, Hiring} from "../../../common/types/company";

export class CreateCompanyDto {
    @IsNotEmpty()
    readonly name: string;

    @IsOptional()
    readonly companyStatus: CompanyStatus;

    @IsNotEmpty()
    readonly country: string;

    @IsNotEmpty()
    readonly town: string;

    @IsNotEmpty()
    readonly street: string;

    @IsNotEmpty()
    readonly zipCode: string;

    @IsNotEmpty()
    readonly description: string;

    @IsNotEmpty()
    readonly companySector: CompanySector;

    @IsOptional()
    readonly hiringStatus: Hiring;

    @IsOptional()
    readonly clearedAt: Date;
}
