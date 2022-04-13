import { User } from '@api/auth/user.entity';
import { Company } from '@api/company/company.entity';
import { EmploymentDto } from '@api/employment/dto/employment.dto';
import { GetEmploymentsFilterDto } from '@api/employment/dto/get-employments-filter.dto';
import { Employment } from '@api/employment/employment.entity';
import { EmploymentRepository } from '@api/employment/employment.repository';
export declare class EmploymentService {
    private employmentRepository;
    constructor(employmentRepository: EmploymentRepository);
    getEmployments(filterDto: GetEmploymentsFilterDto, user: User): Promise<Employment[]>;
    getEmploymentById(id: string, company: Company): Promise<Employment>;
    createEmployment(createEmploymentDto: EmploymentDto, user: User): Promise<Employment>;
    deleteEmployment(id: string): Promise<void>;
    updateEmploymentStatus(id: string, company: Company): Promise<Employment>;
}
