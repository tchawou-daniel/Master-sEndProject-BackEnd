import {IsEnum, IsOptional, IsString} from "class-validator";
import {UserRole, WorkerIntegrationStatus} from "../../../common/types/user";

export class GetUsersFliterDto {
    @IsOptional()
    @IsEnum(UserRole)
    userRole?: UserRole;

    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @IsEnum(WorkerIntegrationStatus)
    workerIntegrationStatus?: WorkerIntegrationStatus;

}
