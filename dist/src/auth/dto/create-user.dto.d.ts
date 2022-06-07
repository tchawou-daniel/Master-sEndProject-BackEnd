import { UserRole } from '../../../common/types/user';
export declare class CreateUserDto {
    readonly firstName: string;
    readonly lastName: string;
    readonly role: UserRole;
    readonly email: string;
    readonly password: string;
    readonly workerIntegrationStatus: string;
}
