import { Company } from '@api/company/company.entity';
import {
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import { EmploymentSector, Hiring } from '../../../common/types/employment';

export class CreateEmploymentDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  readonly country: string;

  @IsNotEmpty()
  @IsString()
  readonly town: string;

  @IsNotEmpty()
  @IsString()
  readonly street: string;

  @IsNotEmpty()
  @IsString()
  readonly zipCode: string;

  @IsNotEmpty()
  @IsEnum(EmploymentSector)
  readonly employmentSector: EmploymentSector;

  @IsOptional()
  readonly hiringStatus: Hiring;

  @IsOptional()
  readonly clearedAt: Date;

  @IsOptional()
  readonly updatedAt: Date;

  @IsOptional()
  readonly createdAt: Date;

  @IsOptional()
  readonly hasManySubsidiaries: boolean;

  @IsNotEmpty()
  readonly company: Company;
}
