import { UserRole, WorkerIntegrationStatus } from "../../../common/types/user";
export declare class GetUsersFliterDto {
    readonly userRole?: UserRole;
    readonly search?: string;
    readonly workerIntegrationStatus?: WorkerIntegrationStatus;
}
