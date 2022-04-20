import { User } from '@api/auth/user.entity';
import { Company } from '@api/company/company.entity';
import { EmploymentDto } from '@api/employment/dto/employment.dto';
import { GetEmploymentsFilterDto } from '@api/employment/dto/get-employments-filter.dto';
import { Employment } from '@api/employment/employment.entity';
import { Repository } from 'typeorm';
export declare class EmploymentRepository extends Repository<Employment> {
    getEmployments(filterDto: GetEmploymentsFilterDto, company?: Company, createdBy?: User): Promise<Employment[]>;
    createEmployment(createEmploymentDto: EmploymentDto, createdBy: User, company: Company): Promise<Employment>;
}
