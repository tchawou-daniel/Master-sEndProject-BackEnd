import { User } from '@api/auth/user.entity';
import { Company } from '@api/company/company.entity';
import { GetUsersWorkForComponiesFilterDto } from '@api/usersWorkForCompanies/dto/get-usersWorkForComponaies-filter.dto';
import { UsersWorkForCompanies } from '@api/usersWorkForCompanies/usersWorkForCompanies.entity';
import { isEqual } from 'lodash';
import { EntityRepository, Repository } from 'typeorm';

import { UserRole } from '../../common/types/user';

@EntityRepository(UsersWorkForCompanies)
export class UsersWorkForCompaniesRepository extends Repository<UsersWorkForCompanies> {
  // ##############       TEMPORARY_WORKER || PERMANENT_WORKER                  ##############
  async getMyOwnCompanies(
    filterDto: GetUsersWorkForComponiesFilterDto,
    user: User,
  ): Promise<UsersWorkForCompanies[]> {
    const query = this.createQueryBuilder('usersWorkForCompanies');
    query.where({ user });

    return query.getMany();
  }

  // ##############   PARTNER_COMPANY_EMPLOYEE, PARTNER_COMPANY_EMPLOYEE_ADMIN  ##############
  // find workers of my company
  async getWorkerOfMyCompany(
    filterDto: GetUsersWorkForComponiesFilterDto,
    company: Company,
    user: User,
  ): Promise<UsersWorkForCompanies[]> {
    if (
      isEqual(user.role, UserRole.PARTNER_COMPANY_EMPLOYEE_ADMIN) ||
      isEqual(user.role, UserRole.PARTNER_COMPANY_EMPLOYEE)
    ) {
      const query = this.createQueryBuilder('usersWorkForCompanies');
      const userId = user.id;
      query.where('usersWorkForCompanies.user = :userId', { userId });
      query.andWhere({ user });
      return query.getMany();
    }
  }
  // find the notation of the company
  // ##############   EMPLOYMENT_AGENCY, ADMIN                                  ##############
  // all users and their corresponding companies

  // find worker of a company companies (EMPLOYMENT_AGENCY, ADMIN)
}
