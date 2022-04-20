import { User } from '@api/auth/user.entity';
import { CreateEmploymentDto } from '@api/employment/dto/create-employment.dto';
import { GetEmploymentsFilterDto } from '@api/employment/dto/get-employments-filter.dto';
import { UpdateEmploymentStatusDto } from '@api/employment/dto/update-employment-status.dto';
import { UpdateEmploymentDto } from '@api/employment/dto/update-employment.dto';
import { Employment } from '@api/employment/employment.entity';
import { EmploymentService } from '@api/employment/employment.service';
export declare class EmploymentController {
    private employmentService;
    private logger;
    constructor(employmentService: EmploymentService);
    getEmploymentsFromAdminUser(filterDto: GetEmploymentsFilterDto): Promise<Employment[]>;
    getEmploymentsByCompanyIdFromAdminUser(id: string, filterDto: GetEmploymentsFilterDto, company: any): Promise<Employment[]>;
    getEmployments(filterDto: GetEmploymentsFilterDto, user: User): Promise<Employment[]>;
    getEmploymentsById(id: string, filterDto: GetEmploymentsFilterDto, company: any, createdBy: User): Promise<Employment[]>;
    getEmploymentsByCompanyId(id: string, filterDto: GetEmploymentsFilterDto, company: any, createdBy: User): Promise<Employment[]>;
    createEmployment(createEmploymentDto: CreateEmploymentDto, user: User): Promise<Employment>;
    updateEmploymentStatus(id: string, updateEmploymentStatusDto: UpdateEmploymentStatusDto): Promise<Employment>;
    updateEmployment(id: string, updateEmploymentDto: UpdateEmploymentDto): Promise<Employment>;
    deleteEmployment(id: string): Promise<void>;
}
