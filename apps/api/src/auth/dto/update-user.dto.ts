import {
    IsEmail,
    IsEnum,
    IsString,
    Matches,
    MaxLength,
    MinLength,
    IsDate, IsOptional
} from 'class-validator';
import {UserRole, WorkerIntegrationStatus} from "../../../common/types/user";
import {Type} from "class-transformer";


export class UpdateUserDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    readonly firstName: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    readonly lastName: string;

    @IsEmail()
    email: string;

    @IsEnum(UserRole)
    role: UserRole;

    @IsEnum(WorkerIntegrationStatus)
    workerIntegrationStatus?: WorkerIntegrationStatus;

    @MinLength(8)
    @MaxLength(50)
    bio: string;

    @IsString()
    avatar: string;

    @Type(() => Date)
    @IsDate()
    clearedAt: Date;

    @Type(() => Date)
    @IsDate()
    joinAt: Date;

    @Type(() => Date)
    @IsDate()
    lastConnection: Date;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password is too weak',
    })
    password: string;
}
