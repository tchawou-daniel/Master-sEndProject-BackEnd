import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { WeekDays, WorkerDayStatus } from '../../../common/types/workerDays';

export class UpdateWorkerDaysDto {
  @IsOptional()
  @IsString()
  startTime: string;

  @IsOptional()
  @IsString()
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
