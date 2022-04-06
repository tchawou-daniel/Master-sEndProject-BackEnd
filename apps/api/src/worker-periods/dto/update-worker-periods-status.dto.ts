import { WorkerPeriodStatus } from '../../../common/types/workerPeriods';
import { IsEnum } from 'class-validator';

export class UpdateWorkerPeriodsStatusDto {
  @IsEnum(WorkerPeriodStatus)
  status: WorkerPeriodStatus;
}
