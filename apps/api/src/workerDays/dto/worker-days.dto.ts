import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

import { WeekDays, WorkerDayStatus } from '../../../common/types/workerDays';

export class WorkerDaysDto {
  @IsNotEmpty()
  @IsNumber()
  startTime: number;

  @IsNotEmpty()
  @IsNumber()
  endTime: number;

  @IsNotEmpty()
  @IsNumber()
  numberOfHours: number;

  @IsNotEmpty()
  @IsEnum(WeekDays)
  weekday: WeekDays;

  @IsNotEmpty()
  @IsEnum(WorkerDayStatus)
  status: WorkerDayStatus;
}
