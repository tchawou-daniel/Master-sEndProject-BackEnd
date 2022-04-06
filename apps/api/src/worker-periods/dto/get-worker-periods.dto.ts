import { IsEnum, IsOptional } from 'class-validator';
import { WorkerPeriodStatus } from '../../../common/types/workerPeriods';
import { FilterDto } from '@api/SHARED/dto/filter.dto';

export class GetWorkerPeriodsFilterDto extends FilterDto{
  @IsOptional()
  @IsEnum(WorkerPeriodStatus)
  status?: WorkerPeriodStatus;
}
