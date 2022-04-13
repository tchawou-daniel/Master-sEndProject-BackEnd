import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

import { WeekDays, WorkerDayStatus } from '../../../common/types/workerDays';

export class GetWorkerDayFilterDto {
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

  @IsOptional()
  @IsEnum(WeekDays)
  weekday: WeekDays;

  @IsOptional()
  @IsEnum(WorkerDayStatus)
  status: WorkerDayStatus;
}
