import { Type } from 'class-transformer';
import {
  IsEnum,
  IsString,
  MaxLength,
  MinLength,
  IsDate,
} from 'class-validator';

import { UserRole, WorkerIntegrationStatus } from '../../../common/types/user';

export class UpdateUserDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
  readonly firstName: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    readonly lastName: string;

    @IsEnum(UserRole)
    readonly role: UserRole;

    @IsEnum(WorkerIntegrationStatus)
    readonly workerIntegrationStatus?: WorkerIntegrationStatus;

    @MinLength(8)
    @MaxLength(50)
    readonly bio: string;

    @IsString()
    readonly avatar: string;

    @Type(() => Date)
    @IsDate()
    readonly clearedAt: Date;

    @Type(() => Date)
    @IsDate()
    readonly joinAt: Date;

    @Type(() => Date)
    @IsDate()
    readonly lastConnection: Date;
}
