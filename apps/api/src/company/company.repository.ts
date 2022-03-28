import {EntityRepository, Repository} from "typeorm";
import {Company} from "@api/company/company.entity";
import {GetCompaniesFilterDto} from "@api/company/dto/get-companies-filter.dto";
import {User} from "@api/auth/user.entity";

@EntityRepository(Company)
export class CompanyRepository extends Repository<Company>{

    async getCompanies(filterDto: GetCompaniesFilterDto, user: User): Promise<Company[]> {
        const { hiringStatus, search } = filterDto;

        const query = this.createQueryBuilder('company');
        query.where({ user });

        if (hiringStatus) {
            query.andWhere('company.hiringStatus = :hiringStatus', { hiringStatus });
        }

        if (search) {
            query.andWhere(
                '(LOWER(company.title) LIKE LOWER(:search) OR LOWER(company.description) LIKE LOWER(:search))',
                { search: `%${search}%` },
            );
        }

        const companies = await query.getMany();
        return companies;
    }

}
