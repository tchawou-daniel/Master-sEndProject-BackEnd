import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

import { WorkerPeriodStatus } from '../../../common/types/workerPeriods';

export class UpdateWorkerPeriodsDto {
  @IsNotEmpty()
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  effectiveAsOf: number;

  @IsNotEmpty()
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  effectiveUntil: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  numberOfHours: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  numberOfDays: number;

  @IsOptional()
  workerPeriodStatus: WorkerPeriodStatus;
}
