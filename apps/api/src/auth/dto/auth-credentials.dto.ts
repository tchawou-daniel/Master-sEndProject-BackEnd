import {
  IsEmail, IsEnum, IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import {UserRole} from "../../../common/types/user";

export class AuthCredentialsDto {
  @IsOptional()
  readonly firstName: string;

  @IsOptional()
  readonly lastName: string;

  @IsEnum(UserRole)
  @IsOptional()
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
}
