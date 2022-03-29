import {IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength} from 'class-validator';
import {AuthCredentialsDto} from "@api/auth/dto/auth-credentials.dto";

export class CreateUserDto extends AuthCredentialsDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    readonly firstName: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    readonly lastName: string;
}
