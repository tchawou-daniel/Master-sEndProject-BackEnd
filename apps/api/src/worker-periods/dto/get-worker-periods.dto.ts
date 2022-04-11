import { FilterDto } from '@api/SHARED/dto/filter.dto';
import { IsEnum, IsOptional } from 'class-validator';

import { WorkerPeriodStatus } from '../../../common/types/workerPeriods';

export class GetWorkerPeriodsFilterDto extends FilterDto {
  @IsOptional()
  @IsEnum(WorkerPeriodStatus)
  status?: WorkerPeriodStatus;
}
