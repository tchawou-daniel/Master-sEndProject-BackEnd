import { AuthCredentialsDto } from "@api/auth/dto/auth-credentials.dto";
export declare class CreateUserDto extends AuthCredentialsDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
