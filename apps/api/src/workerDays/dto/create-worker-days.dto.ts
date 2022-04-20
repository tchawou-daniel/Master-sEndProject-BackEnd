import { WorkerPeriods } from '@api/worker-periods/workerPeriods.entity';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { WeekDays, WorkerDayStatus } from '../../../common/types/workerDays';

export class CreateWorkerDaysDto {
  @IsNotEmpty()
  @IsString()
  startTime: string;

  @IsNotEmpty()
  @IsString()
  endTime: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  numberOfHours: number;

  @IsNotEmpty()
  @IsEnum(WeekDays)
  weekday: WeekDays;

  @IsNotEmpty()
  @IsEnum(WorkerDayStatus)
  workerDayStatus: WorkerDayStatus;

  @IsNotEmpty()
  workerPeriodsId: WorkerPeriods;
}
