import { IsNotEmpty } from 'class-validator';
import {AuthCredentialsDto} from "@api/auth/dto/auth-credentials.dto";

export class LoginUserDto extends AuthCredentialsDto {
}
