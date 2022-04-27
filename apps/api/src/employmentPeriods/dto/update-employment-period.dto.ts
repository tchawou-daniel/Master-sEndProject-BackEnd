import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

import { EmploymentPeriodStatus } from '../../../common/types/EmploymentPeriods';

export class UpdateEmploymentPeriodDto {
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  effectiveAsOf: number;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  effectiveUntil: number;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  numberOfDays: number;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  numberOfHours: number;

  @IsNotEmpty()
  employmentPeriodStatus: EmploymentPeriodStatus;
}
