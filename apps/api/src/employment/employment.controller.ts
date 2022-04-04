import {Body, Controller, Get, Logger, Post, Query, UseGuards} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {EmploymentService} from "@api/employment/employment.service";
import {GetUser} from "@api/auth/get-user.decorator";
import {User} from "@api/auth/user.entity";
import {CreateEmploymentDto} from "@api/employment/dto/create-employment.dto";
import {GetEmploymentsFilterDto} from "@api/employment/dto/get-employments-filter.dto";
import {Employment} from "@api/employment/employment.entity";

@Controller('employment')
@UseGuards(AuthGuard())
export class EmploymentController {
    private logger = new Logger('EmploymentController');
    constructor(private employmentService: EmploymentService) {}

    @Get()
    getEmployment(
        @Query() filterDto: GetEmploymentsFilterDto,
        @GetUser() user: User,
    ){
        this.logger.verbose(
            `"User ${user.firstName}" retrieving all employments Filters: ${JSON.stringify(
                filterDto,
            )}`,
        );
        return this.employmentService.getEmployments(filterDto, user)
    }

    @Post()
    createEmployment(
        @Body() createEmploymentDto: CreateEmploymentDto,
        @GetUser() user: User,
    ): Promise<Employment> {
        return this.employmentService.createEmployment(createEmploymentDto, user);
    }

}
