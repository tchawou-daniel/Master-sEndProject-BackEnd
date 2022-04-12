import { User } from '@api/auth/user.entity';
import { CreateEmploymentDto } from '@api/employment/dto/create-employment.dto';
import { GetEmploymentsFilterDto } from '@api/employment/dto/get-employments-filter.dto';
import { Employment } from '@api/employment/employment.entity';
import { EmploymentRepository } from '@api/employment/employment.repository';
export declare class EmploymentService {
    private employmentRepository;
    constructor(employmentRepository: EmploymentRepository);
    getEmployments(filterDto: GetEmploymentsFilterDto, user: User): Promise<Employment[]>;
    createEmployment(createEmploymentDto: CreateEmploymentDto, user: User): Promise<Employment>;
}
