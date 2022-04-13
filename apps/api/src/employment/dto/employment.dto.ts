import { IsNotEmpty, IsOptional } from 'class-validator';

import { EmploymentSector, Hiring } from '../../../common/types/employment';

export class EmploymentDto {
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
  readonly companyName: Date;

  @IsOptional()
  readonly hasManySubsidiaries: boolean;
}
