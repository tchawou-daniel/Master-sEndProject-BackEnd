import { UserRole } from "../../../common/types/user";
export declare class AuthCredentialsDto {
    readonly firstName: string;
    readonly lastName: string;
    readonly role: UserRole;
    readonly email: string;
    readonly password: string;
}
