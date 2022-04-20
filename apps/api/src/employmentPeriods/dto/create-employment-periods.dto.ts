import { Employment } from '@api/employment/employment.entity';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

import { EmploymentPeriodStatus } from '../../../common/types/EmploymentPeriods';

export class CreateEmploymentPeriodsDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  effectiveAsOf: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  effectiveUntil: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  numberOfDays: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  numberOfHours: number;

  @IsOptional()
  employmentPeriodStatus: EmploymentPeriodStatus;

  @IsNotEmpty()
  employmentId: Employment;
}
