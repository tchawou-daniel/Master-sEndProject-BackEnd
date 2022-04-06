import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

import { WorkerPeriodStatus } from '../../../common/types/workerPeriods';

export class CreateWorkerPeriodsFilterDto {
  @IsNotEmpty()
  @IsOptional()
  @IsNumber()
  effectiveAsOf: number;

  @IsNotEmpty()
  @IsOptional()
  @IsNumber()
  effectiveUntil: number;

  @IsOptional()
  @IsNumber()
  numberOfHours: number;

  @IsNotEmpty()
  workerPeriodStatus: WorkerPeriodStatus;
}
