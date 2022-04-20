import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

import {
  EmploymentDayStatus,
  WeekDays,
} from '../../../common/types/employmentDays';

export class UpdateEmploymentDaysDto {
  @IsOptional()
  @IsNumber()
  startTime: number;

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
  @IsEnum(EmploymentDayStatus)
  status: EmploymentDayStatus;
}
