import { WorkerPeriods } from '@api/worker-periods/workerPeriods.entity';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

import { WeekDays, WorkerDayStatus } from '../../../common/types/workerDays';

export class CreateWorkerDaysDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(5)
  startTime: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(5)
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
