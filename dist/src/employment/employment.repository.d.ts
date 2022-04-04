import { Repository } from "typeorm";
import { Employment } from "@api/employment/employment.entity";
import { CreateEmploymentDto } from "@api/employment/dto/create-employment.dto";
import { User } from "@api/auth/user.entity";
import { GetEmploymentsFilterDto } from "@api/employment/dto/get-employments-filter.dto";
export declare class EmploymentRepository extends Repository<Employment> {
    getEmployements(filterDto: GetEmploymentsFilterDto, user: User): Promise<Employment[]>;
    createEmployment(createEmploymentDto: CreateEmploymentDto, user: User): Promise<Employment>;
}
