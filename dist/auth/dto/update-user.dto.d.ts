import { UserRole, WorkerIntegrationStatus } from "../../../common/user";
export declare class UpdateUserDto {
    readonly firstName: string;
    readonly lastName: string;
    email: string;
    role: UserRole;
    workerIntegrationStatus?: WorkerIntegrationStatus;
    bio: string;
    avatar: string;
    clearedAt: Date;
    joinAt: Date;
    lastConnection: Date;
    password: string;
}
