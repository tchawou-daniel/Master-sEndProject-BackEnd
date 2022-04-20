import { User } from '@api/auth/user.entity';
import { Company } from '@api/company/company.entity';
import { EmploymentDto } from '@api/employment/dto/employment.dto';
import { GetEmploymentsFilterDto } from '@api/employment/dto/get-employments-filter.dto';
import { Employment } from '@api/employment/employment.entity';
import { EmploymentService } from '@api/employment/employment.service';
export declare class EmploymentController {
    private employmentService;
    private logger;
    constructor(employmentService: EmploymentService);
    getEmploymentsFromAdminUser(filterDto: GetEmploymentsFilterDto): Promise<Employment[]>;
    getEmploymentsByCompanyIdFromAdminUser(id: string, filterDto: GetEmploymentsFilterDto, company: any, createdBy: User): Promise<Employment[]>;
    getEmployments(filterDto: GetEmploymentsFilterDto, user: User): Promise<Employment[]>;
    getEmploymentsByCompanyId(id: string, filterDto: GetEmploymentsFilterDto, company: any, createdBy: User): Promise<Employment[]>;
    createEmployment(createEmploymentDto: EmploymentDto, user: User, company: Company): Promise<Employment>;
    deleteEmployment(id: string): Promise<void>;
    updateEmploymentStatus(id: string, createdUser: User, company: Company): Promise<Employment>;
}
