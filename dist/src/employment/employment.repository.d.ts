import { User } from '@api/auth/user.entity';
import { EmploymentDto } from '@api/employment/dto/employment.dto';
import { GetEmploymentsFilterDto } from '@api/employment/dto/get-employments-filter.dto';
import { Employment } from '@api/employment/employment.entity';
import { Repository } from 'typeorm';
export declare class EmploymentRepository extends Repository<Employment> {
    getEmployements(filterDto: GetEmploymentsFilterDto, user: User): Promise<Employment[]>;
    createEmployment(createEmploymentDto: EmploymentDto, user: User): Promise<Employment>;
}
