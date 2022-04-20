import { IsEmpty, IsOptional } from 'class-validator';

import { EmploymentSector, Hiring } from '../../../common/types/employment';

export class UpdateEmploymentDto {
  @IsEmpty()
  readonly name: string;

  @IsEmpty()
  readonly description: string;

  @IsEmpty()
  readonly country: string;

  @IsEmpty()
  readonly town: string;

  @IsEmpty()
  readonly street: string;

  @IsEmpty()
  readonly zipCode: string;

  @IsEmpty()
  readonly employmentSector: EmploymentSector;

  @IsEmpty()
  readonly hiringStatus: Hiring;

  @IsOptional()
  readonly clearedAt: Date;

  @IsOptional()
  readonly updatedAt: Date;

  @IsEmpty()
  readonly hasManySubsidiaries: boolean;
}
