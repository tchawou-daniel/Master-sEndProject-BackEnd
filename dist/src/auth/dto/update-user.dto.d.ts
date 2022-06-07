import { UserRole, WorkerIntegrationStatus } from '../../../common/types/user';
export declare class UpdateUserDto {
    readonly firstName: string;
    readonly lastName: string;
    readonly role: UserRole;
    readonly workerIntegrationStatus?: WorkerIntegrationStatus;
    readonly bio: string;
    readonly avatar: string;
    readonly clearedAt: Date;
    readonly joinedAt: Date;
    readonly lastConnection: Date;
}
