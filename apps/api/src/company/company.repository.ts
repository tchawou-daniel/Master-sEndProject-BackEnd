import {EntityRepository, Repository} from "typeorm";
import {Company} from "@api/company/company.entity";
import {GetCompaniesFilterDto} from "@api/company/dto/get-companies-filter.dto";
import {User} from "@api/auth/user.entity";
import {CreateCompanyDto} from "@api/company/dto/create-company.dto";
import {UserRole} from "../../common/types/user";

@EntityRepository(Company)
export class CompanyRepository extends Repository<Company>{
    // according to the user access
    async getCompanies(filterDto: GetCompaniesFilterDto, user: User): Promise<Company[]> {
            const { hiringStatus, search } = filterDto;
            const query = this.createQueryBuilder('company');
            query.where({user});

            //PARTNER_COMPANY_EMPLOYEE_ADMIN -- problem
            query.andWhere('user.role = :userRole', {userRole: UserRole.ADMIN });

            if (hiringStatus) {
                query.andWhere('company.hiringStatus = :hiringStatus', { hiringStatus });
            }

            if (search) {
                query.andWhere(
                    '(LOWER(company.name) LIKE LOWER(:search) OR LOWER(company.description) LIKE LOWER(:search))',
                    { search: `%${search}%` },
                );
            }


            const companies = await query.getMany();
            return companies;
    }

    async createCompany(createTaskDto: CreateCompanyDto, user: User): Promise<Company> {
        if(user.role === UserRole.ADMIN || user.role === UserRole.PARTNER_COMPANY_EMPLOYEE_ADMIN){
            const {
                name,
                companyStatus,
                country,
                town,
                street,
                zipCode,
                description,
                companySector,
                hiringStatus,
                clearedAt,
            } = createTaskDto;

            const company = this.create({
                name,
                companyStatus,
                country,
                town,
                street,
                zipCode,
                description,
                companySector,
                hiringStatus,
                clearedAt,
                user,
            });
            await this.save(company);
            return company;
        }
    }



}
