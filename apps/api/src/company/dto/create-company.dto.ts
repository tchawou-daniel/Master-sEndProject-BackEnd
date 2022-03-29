import {IsNotEmpty, IsOptional} from 'class-validator';
import {CompanySector, CompanyStatus, Hiring} from "../../../common/types/company";

export class CreateCompanyDto {
    @IsNotEmpty()
    name: string;

    @IsOptional()
    companyStatus: CompanyStatus;

    @IsNotEmpty()
    country: string;

    @IsNotEmpty()
    town: string;

    @IsNotEmpty()
    street: string;

    @IsNotEmpty()
    zipCode: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    companySector: CompanySector;

    @IsNotEmpty()
    hiringStatus: Hiring;

    @IsNotEmpty()
    clearedAt: Date;
}
