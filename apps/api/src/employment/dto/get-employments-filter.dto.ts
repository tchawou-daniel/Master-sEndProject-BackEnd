import {Employment} from "@api/employment/employment.entity";
import {IsEnum, IsOptional, IsString} from "class-validator";
import {Hiring} from "../../../common/types/Employment";

export class GetEmploymentsFilterDto {
    @IsOptional()
    @IsEnum(Employment)
    readonly hiringStatus?: Hiring;

    @IsOptional()
    @IsString()
    readonly search?: string;
}
