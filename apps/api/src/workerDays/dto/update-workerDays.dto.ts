import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString, MaxLength,
} from 'class-validator';

import { WeekDays, WorkerDayStatus } from '../../../common/types/workerDays';

export class UpdateWorkerDaysDto {
  @IsOptional()
  @IsString()
  @MaxLength(5)
  startTime: string;

  @IsOptional()
  @IsString()
  @MaxLength(5)
  endTime: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  numberOfHours: number;

  @IsOptional()
  @IsEnum(WeekDays)
  weekday: WeekDays;

  @IsOptional()
  @IsEnum(WorkerDayStatus)
  workerDayStatus: WorkerDayStatus;
}
