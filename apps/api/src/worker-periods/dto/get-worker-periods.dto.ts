import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PeriodStatus } from '../../../common/types/workerPeriods';
import { FilterDto } from '@api/SHARED/dto/filter.dto';

export class GetWorkerPeriodsFilterDto extends FilterDto{
  @IsOptional()
  @IsEnum(PeriodStatus)
  status?: PeriodStatus;
}
