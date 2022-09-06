import { Type } from 'class-transformer';
import {
  IsEnum,
  IsString,
  MaxLength,
  MinLength,
  IsDate,
  IsOptional, IsEmail,
} from 'class-validator';

import { UserRole, WorkerIntegrationStatus } from '../../../common/types/user';

export class UpdateUserDto {
  @IsString()
  readonly firstName: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  readonly lastName: string;

  @IsEmail()
  readonly email: string;

  @IsEnum(UserRole)
  @IsOptional()
  readonly role: UserRole;

  @IsEnum(WorkerIntegrationStatus)
  @IsOptional()
  readonly workerIntegrationStatus?: WorkerIntegrationStatus;

  @MinLength(8)
  @MaxLength(50)
  readonly bio: string;

  @IsString()
  readonly avatar: string;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  readonly clearedAt: Date;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  readonly joinedAt: Date;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  readonly lastConnection: Date;
}
