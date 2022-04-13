import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

import {
  EmploymentDayStatus,
  WeekDays,
} from '../../../common/types/employmentDays';

export class EmploymentDaysDto {
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
  @IsEnum(EmploymentDayStatus)
  status: EmploymentDayStatus;
}
