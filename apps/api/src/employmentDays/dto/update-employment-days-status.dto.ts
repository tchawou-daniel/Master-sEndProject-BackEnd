import { IsEnum } from 'class-validator';

import { EmploymentDayStatus } from '../../../common/types/employmentDays';

export class UpdateEmploymentDaysStatusDto {
  @IsEnum(EmploymentDayStatus)
  status: EmploymentDayStatus;
}
