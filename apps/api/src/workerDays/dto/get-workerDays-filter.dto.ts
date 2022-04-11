import { IsEnum, IsNumber, IsOptional } from 'class-validator';

import { WeekDays, WorkerDayStatus } from '../../../common/types/workerDays';

export class GetWorkerDaysFilterDto {
  @IsOptional()
  @IsNumber()
  startTime?: number;

  @IsOptional()
  @IsNumber()
  endTime?: number;

  @IsOptional()
  @IsNumber()
  numberOfHours: number;

  @IsOptional()
  @IsEnum(WeekDays)
  weekday: WeekDays;

  @IsOptional()
  @IsEnum(WorkerDayStatus)
  workerDayStatus: WorkerDayStatus;
}
