import { IsEnum, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

import {
  EmploymentDayStatus,
  WeekDays,
} from '../../../common/types/employmentDays';
import { Type } from 'class-transformer';

export class GetEmploymentDto {
  @IsOptional()
  @IsString()
  @MaxLength(5)
  startTime: string;

  @IsOptional()
  @IsString()
  @MaxLength(5)
  endTime: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  numberOfHours: number;

  @IsOptional()
  @IsEnum(WeekDays)
  weekday: WeekDays;

  @IsOptional()
  @IsEnum(EmploymentDayStatus)
  status: EmploymentDayStatus;
}
