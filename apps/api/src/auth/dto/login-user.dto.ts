import {IsEmail, IsString, Matches, MaxLength, MinLength} from 'class-validator';
import {AuthCredentialsDto} from "@api/auth/dto/auth-credentials.dto";

export class LoginUserDto extends AuthCredentialsDto {
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
