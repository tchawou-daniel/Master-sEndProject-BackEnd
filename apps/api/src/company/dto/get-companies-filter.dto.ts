import { IsEnum, IsOptional, IsString } from 'class-validator';
import {Company} from "@api/company/company.entity";
import {Hiring} from "../../../common/types/company";

export class GetCompaniesFilterDto {
    @IsOptional()
    @IsEnum(Company)
    hiringStatus?: Hiring;

    @IsOptional()
    @IsString()
    search?: string;
}
