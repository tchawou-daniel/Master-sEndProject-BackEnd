import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

import { EmploymentPeriodStatus } from '../../../common/types/EmploymentPeriods';

export class EmploymentPeriodsDto {
  @IsNotEmpty()
  @IsOptional()
  @IsNumber()
  effectiveAsOf: number;

  @IsNotEmpty()
  @IsOptional()
  @IsNumber()
  effectiveUntil: number;

  @IsOptional()
  @IsNumber()
  numberOfHours: number;

  @IsNotEmpty()
  employmentPeriodStatus: EmploymentPeriodStatus;
}
