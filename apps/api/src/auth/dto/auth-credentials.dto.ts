import {
  IsEmail, IsEnum, IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import {UserRole} from "../../../common/user";

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  firstName: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  lastName: string;

  @IsEmail()
  email: string;

  @IsEnum(UserRole)
  @IsOptional()
  role: UserRole;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
    password: string;
}
