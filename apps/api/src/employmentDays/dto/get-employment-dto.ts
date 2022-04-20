import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';

import {
  EmploymentDayStatus,
  WeekDays,
} from '../../../common/types/employmentDays';

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
  @IsString()
  numberOfHours: number;

  @IsOptional()
  @IsEnum(WeekDays)
  weekday: WeekDays;

  @IsOptional()
  @IsEnum(EmploymentDayStatus)
  status: EmploymentDayStatus;
}
