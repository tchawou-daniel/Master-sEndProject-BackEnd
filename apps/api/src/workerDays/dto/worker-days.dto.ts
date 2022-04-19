import { IsDecimal, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

import { WeekDays, WorkerDayStatus } from '../../../common/types/workerDays';
import { Type } from 'class-transformer';

export class WorkerDaysDto {
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
}
