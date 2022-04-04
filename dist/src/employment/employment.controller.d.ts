import { EmploymentService } from "@api/employment/employment.service";
import { User } from "@api/auth/user.entity";
import { CreateEmploymentDto } from "@api/employment/dto/create-employment.dto";
import { GetEmploymentsFilterDto } from "@api/employment/dto/get-employments-filter.dto";
import { Employment } from "@api/employment/employment.entity";
export declare class EmploymentController {
    private employmentService;
    private logger;
    constructor(employmentService: EmploymentService);
    getEmployment(filterDto: GetEmploymentsFilterDto, user: User): Promise<Employment[]>;
    createEmployment(createEmploymentDto: CreateEmploymentDto, user: User): Promise<Employment>;
}
