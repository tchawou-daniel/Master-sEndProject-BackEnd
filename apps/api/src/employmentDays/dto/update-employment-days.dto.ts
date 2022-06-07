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

export class UpdateEmploymentDaysDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(5)
  startTime: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(5)
  endTime: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  numberOfHours: number;

  @IsNotEmpty()
  @IsEnum(WeekDays)
  weekday: WeekDays;

  @IsOptional()
  @IsEnum(EmploymentDayStatus)
  status: EmploymentDayStatus;
}
