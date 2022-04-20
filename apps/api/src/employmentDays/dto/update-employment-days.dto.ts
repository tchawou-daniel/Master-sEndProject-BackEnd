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
