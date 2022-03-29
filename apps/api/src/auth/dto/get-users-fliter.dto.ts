import {IsEnum, IsOptional, IsString} from "class-validator";
import {UserRole, WorkerIntegrationStatus} from "../../../common/types/user";

export class GetUsersFliterDto {
    @IsOptional()
    @IsEnum(UserRole)
    readonly userRole?: UserRole;

    @IsOptional()
    @IsString()
    readonly search?: string;

    @IsOptional()
    @IsEnum(WorkerIntegrationStatus)
    readonly workerIntegrationStatus?: WorkerIntegrationStatus;
}
