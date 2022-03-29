import {EntityRepository, Repository} from "typeorm";
import {UsersWorkForCompanies} from "@api/usersWorkForCompanies/usersWorkForCompanies.entity";
import {GetUsersWorkForComponaiesFilterDto} from "@api/usersWorkForCompanies/dto/get-usersWorkForComponaies-filter.dto";
import {Company} from "@api/company/company.entity";

@EntityRepository(UsersWorkForCompanies)
export class UsersWorkForCompaniesRepository extends Repository<UsersWorkForCompanies> {
    // to change
    async getUsersWorkForCompanies(filterDto: GetUsersWorkForComponaiesFilterDto, company: Company): Promise<UsersWorkForCompanies[]> {
        const { hiringStatus, search } = filterDto;

        const query = this.createQueryBuilder('user');
        query.where({ company });

        if (hiringStatus) {
            query.andWhere('company.hiringStatus = :hiringStatus', { hiringStatus });
        }

        if (search) {
            query.andWhere(
                '(LOWER(company.name) LIKE LOWER(:search) OR LOWER(company.description) LIKE LOWER(:search))',
                { search: `%${search}%` },
            );
        }

        const usersWorkForCompanies = await query.getMany();
        return usersWorkForCompanies;
    }
}
