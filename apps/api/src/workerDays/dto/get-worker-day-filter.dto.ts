import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { WeekDays, WorkerDayStatus } from '../../../common/types/workerDays';

export class GetWorkerDayFilterDto {
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  startTime: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  endTime: string;

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
