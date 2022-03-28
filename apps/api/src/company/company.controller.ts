import {Controller, Get, Query, UseGuards} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {GetUser} from "@api/auth/get-user.decorator";
import {User} from "@api/auth/user.entity";
import {Company} from "@api/company/company.entity";
import {GetCompaniesFilterDto} from "@api/company/dto/get-companies-filter.dto";
import {CompanyService} from "@api/company/company.service";

@Controller('company')
@UseGuards(AuthGuard())
export class CompanyController {
    constructor(private companyService: CompanyService) {}

    @Get()
    getCopany(
        @Query() filterDto: GetCompaniesFilterDto,
        @GetUser() user: User,
    ): Promise<Company[]> {
        return this.companyService.getCompany(filterDto, user);
    }

}
