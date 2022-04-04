import {IsNotEmpty, IsOptional} from "class-validator";
import {EmploymentSector, Hiring} from "../../../common/types/Employment";

export class CreateEmploymentDto {
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly description: string;

    @IsNotEmpty()
    readonly country: string;

    @IsNotEmpty()
    readonly town: string;

    @IsNotEmpty()
    readonly street: string;

    @IsNotEmpty()
    readonly zipCode: string;

    @IsNotEmpty()
    readonly employementSector: EmploymentSector;

    @IsOptional()
    readonly hiringStatus: Hiring;

    @IsOptional()
    readonly clearedAt: Date;

    @IsOptional()
    readonly updateAt: Date;

    @IsOptional()
    readonly companyName: Date;

    @IsOptional()
    readonly hasManySubsidiaries: boolean;
}
