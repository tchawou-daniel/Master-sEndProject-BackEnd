import { IsEnum, IsOptional, IsString } from 'class-validator';
import {Company} from "@api/company/company.entity";
import {Hiring} from "../../../common/types/company";

export class GetCompaniesFilterDto {
    @IsOptional()
    @IsEnum(Company)
    readonly hiringStatus?: Hiring;

    @IsOptional()
    @IsString()
    readonly search?: string;
}
