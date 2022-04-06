import { IsEnum } from 'class-validator';

import { WorkerPeriodStatus } from '../../../common/types/workerPeriods';

export class UpdateWorkerPeriodsStatusDto {
  @IsEnum(WorkerPeriodStatus)
  status: WorkerPeriodStatus;
}
