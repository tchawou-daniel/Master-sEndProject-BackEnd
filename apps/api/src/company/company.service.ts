import {Get, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {CompanyRepository} from "@api/company/company.repository";
import {GetCompaniesFilterDto} from "@api/company/dto/get-companies-filter.dto";
import {Company} from "@api/company/company.entity";
import {User} from "@api/auth/user.entity";

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(CompanyRepository)
        private companyRepository: CompanyRepository,
    ) {}

    @Get()
    getCompany(filterDto: GetCompaniesFilterDto, user: User):Promise<Company[]>{
        return this.companyRepository.getCompanies(filterDto, user);
    }

}
