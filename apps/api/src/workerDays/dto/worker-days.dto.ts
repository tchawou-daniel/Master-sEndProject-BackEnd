import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

import { WeekDays, WorkerDayStatus } from '../../../common/types/workerDays';

export class WorkerDaysDto {
  @IsNotEmpty()
  @IsOptional()
  @IsNumber()
  startTime: number;

  @IsNotEmpty()
  @IsOptional()
  @IsNumber()
  endTime: number;

  @IsOptional()
  @IsNumber()
  numberOfHours: number;

  @IsNotEmpty()
  @IsEnum(WeekDays)
  weekday: WeekDays;

  @IsNotEmpty()
  @IsEnum(WorkerDayStatus)
  status: WorkerDayStatus;
}
