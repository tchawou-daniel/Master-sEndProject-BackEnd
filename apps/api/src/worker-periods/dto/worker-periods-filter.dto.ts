import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

import { WorkerPeriodStatus } from '../../../common/types/workerPeriods';

export class WorkerPeriodsFilterDto {
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
  workerPeriodStatus: WorkerPeriodStatus;
}
