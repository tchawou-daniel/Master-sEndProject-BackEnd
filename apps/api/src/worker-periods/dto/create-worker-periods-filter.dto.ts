import { Column, ManyToOne } from 'typeorm';
import {  WorkerPeriodStatus } from '../../../common/types/workerPeriods';
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

  @IsOptional()
  @IsNumber()
  numberOfHours: number;

  @IsNotEmpty()
  workerPeriodStatus: WorkerPeriodStatus;
}
