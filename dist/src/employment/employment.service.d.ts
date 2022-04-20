import { User } from '@api/auth/user.entity';
import { Company } from '@api/company/company.entity';
import { EmploymentDto } from '@api/employment/dto/employment.dto';
import { GetEmploymentsFilterDto } from '@api/employment/dto/get-employments-filter.dto';
import { Employment } from '@api/employment/employment.entity';
import { EmploymentRepository } from '@api/employment/employment.repository';
export declare class EmploymentService {
    private employmentRepository;
    constructor(employmentRepository: EmploymentRepository);
    getEmployments(filterDto: GetEmploymentsFilterDto, user?: User): Promise<Employment[]>;
    getEmploymentsByCompanyId(id: string, filterDto: GetEmploymentsFilterDto, user: User, company: Company): Promise<Employment[]>;
    getEmploymentById(id: string, user: User, company: Company): Promise<Employment>;
    createEmployment(createEmploymentDto: EmploymentDto, user: User, company: Company): Promise<Employment>;
    deleteEmployment(id: string): Promise<void>;
    updateEmploymentStatus(id: string, company: Company, createdBy: User): Promise<Employment>;
}
