import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

import { UserRole, WorkerIntegrationStatus } from '../../../common/types/user';

export class CreateUserDto {
  @IsOptional()
  readonly firstName: string;

  @IsOptional()
  readonly lastName: string;

  @IsEnum(UserRole)
  readonly role: UserRole;

  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  readonly password: string;

  @IsEnum(WorkerIntegrationStatus)
  @IsOptional()
  readonly workerIntegrationStatus: string;
}
