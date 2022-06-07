import { FilterDto } from '@api/SHARED/dto/filter.dto';
import { IsEnum, IsOptional } from 'class-validator';

import { EmploymentPeriodStatus } from '../../../common/types/EmploymentPeriods';

export class GetEmploymentPeriodsFilterDto extends FilterDto {
  @IsOptional()
  @IsEnum(EmploymentPeriodStatus)
  status?: EmploymentPeriodStatus;
}
