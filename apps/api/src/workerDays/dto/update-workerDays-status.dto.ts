import { IsEnum } from 'class-validator';

import { WorkerDayStatus } from '../../../common/types/workerDays';

export class UpdateWorkerDaysStatusDto {
  @IsEnum(WorkerDayStatus)
  workerDayStatus: WorkerDayStatus;
}
