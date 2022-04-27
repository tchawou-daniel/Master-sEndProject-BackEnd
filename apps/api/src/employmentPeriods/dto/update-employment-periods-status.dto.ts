import { IsEnum } from 'class-validator';

import { EmploymentPeriodStatus } from '../../../common/types/EmploymentPeriods';

export class UpdateEmploymentPeriodsStatusDto {
  @IsEnum(EmploymentPeriodStatus)
  status: EmploymentPeriodStatus;
}
