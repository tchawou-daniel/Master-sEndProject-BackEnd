import { User } from '@api/auth/user.entity';
import { Company } from '@api/company/company.entity';
import { CreateEmploymentDto } from '@api/employment/dto/create-employment.dto';
import { GetEmploymentsFilterDto } from '@api/employment/dto/get-employments-filter.dto';
import { Employment } from '@api/employment/employment.entity';
import { Repository } from 'typeorm';
export declare class EmploymentRepository extends Repository<Employment> {
    getEmployments(filterDto: GetEmploymentsFilterDto, company?: Company, createdBy?: User): Promise<Employment[]>;
    createEmployment(createEmploymentDto: CreateEmploymentDto, createdBy: User): Promise<Employment>;
}
