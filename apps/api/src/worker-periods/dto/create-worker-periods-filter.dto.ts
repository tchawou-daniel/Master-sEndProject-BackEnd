import { Column, ManyToOne } from 'typeorm';
import { PeriodStatus } from '../../../common/types/workerPeriods';
import { User } from '@api/auth/user.entity';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateWorkerPeriodsFilterDto {
  @IsNotEmpty()
  @IsOptional()
  @IsNumber()
  effectiveAsOf: number;

  @IsNotEmpty()
  @IsOptional()
  @IsNumber()
  effectiveUntil: number;

  @IsNotEmpty()
  periodStatus: PeriodStatus;

  @IsOptional()
  @IsNumber()
  numberOfHours: number;

}
