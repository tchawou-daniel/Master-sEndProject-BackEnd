import { EmploymentPeriods } from '@api/employmentPeriods/employmentPeriods.entity';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import {
  EmploymentDayStatus,
  WeekDays,
} from '../../../common/types/employmentDays';

export class CreateEmploymentDaysDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(5)
  startTime: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(5)
  endTime: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  numberOfHours: number;

  @IsNotEmpty()
  @IsEnum(WeekDays)
  weekday: WeekDays;

  @IsNotEmpty()
  @IsEnum(EmploymentDayStatus)
  status: EmploymentDayStatus;

  @IsNotEmpty()
  employmentPeriods: EmploymentPeriods;
}
