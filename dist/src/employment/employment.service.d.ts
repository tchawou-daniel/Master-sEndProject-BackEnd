import { User } from '@api/auth/user.entity';
import { Company } from '@api/company/company.entity';
import { CreateEmploymentDto } from '@api/employment/dto/create-employment.dto';
import { GetEmploymentsFilterDto } from '@api/employment/dto/get-employments-filter.dto';
import { UpdateEmploymentStatusDto } from '@api/employment/dto/update-employment-status.dto';
import { UpdateEmploymentDto } from '@api/employment/dto/update-employment.dto';
import { Employment } from '@api/employment/employment.entity';
import { EmploymentRepository } from '@api/employment/employment.repository';
export declare class EmploymentService {
    private employmentRepository;
    constructor(employmentRepository: EmploymentRepository);
    getEmployments(filterDto: GetEmploymentsFilterDto, user?: User): Promise<Employment[]>;
    getEmploymentById(id: string, user?: User, company?: Company): Promise<Employment>;
    getEmploymentsByCompanyId(id: string, filterDto: GetEmploymentsFilterDto, company: Company, user?: User): Promise<Employment[]>;
    createEmployment(createEmploymentDto: CreateEmploymentDto, user: User): Promise<Employment>;
    updateEmploymentStatus(id: string, updateEmploymentStatusDto: UpdateEmploymentStatusDto): Promise<Employment>;
    updateEmployment(id: string, updateEmploymentDto: UpdateEmploymentDto): Promise<Employment>;
    deleteEmployment(id: string): Promise<void>;
}
