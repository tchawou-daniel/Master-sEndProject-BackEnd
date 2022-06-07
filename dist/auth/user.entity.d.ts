import { UserRole, WorkerIntegrationStatus } from "../../common/user";
import { BaseEntity } from "@api/shared/entities/base.entity";
export declare class User extends BaseEntity {
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    role: UserRole;
    workerIntegrationStatus: WorkerIntegrationStatus;
    bio: string;
    avatar: string;
    clearedAt: Date;
    joinAt: Date;
    lastConnection: Date;
}
