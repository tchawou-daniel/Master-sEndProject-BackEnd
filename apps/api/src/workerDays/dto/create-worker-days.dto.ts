import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

import { WeekDays, WorkerDayStatus } from '../../../common/types/workerDays';

export class CreateWorkerDaysDto {
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
  weekday: WeekDays;

  @IsNotEmpty()
  status: WorkerDayStatus;
}
