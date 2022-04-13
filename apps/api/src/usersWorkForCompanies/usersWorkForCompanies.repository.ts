import { User } from '@api/auth/user.entity';
import { Company } from '@api/company/company.entity';
import { GetUsersWorkForComponiesFilterDto } from '@api/usersWorkForCompanies/dto/get-usersWorkForComponaies-filter.dto';
import { UsersWorkForCompanies } from '@api/usersWorkForCompanies/usersWorkForCompanies.entity';
import { isEqual } from 'lodash';
import { EntityRepository, Repository } from 'typeorm';

import { UserRole } from '../../common/types/user';

@EntityRepository(UsersWorkForCompanies)
export class UsersWorkForCompaniesRepository extends Repository<UsersWorkForCompanies> {
  async getUsersWorkForCompanies(
    filterDto: GetUsersWorkForComponiesFilterDto,
    user: User,
  ): Promise<UsersWorkForCompanies[]> {
    const { scoreCompany, companyReviews, workerReviews } = filterDto;

    const query = this.createQueryBuilder('task');
    query.where({ user });

    if (scoreCompany) {
      query.andWhere('usersWorkForCompanies.scoreCompany = :scoreCompany', {
        scoreCompany,
      });
    }

    if (companyReviews) {
      query.andWhere(
        '(LOWER(usersWorkForCompanies.companyReviews) LIKE LOWER(:search)',
        { search: `%${companyReviews}%` },
      );
    }

    if (workerReviews) {
      query.andWhere(
        '(LOWER(usersWorkForCompanies.workerReviews) LIKE LOWER(:search)',
        { search: `%${workerReviews}%` },
      );
    }

    const usersWorkForCompanies = await query.getMany();
    return usersWorkForCompanies;
  }

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
    usersWorkForCompanies: UsersWorkForCompanies,
    user: User,
  ): Promise<UsersWorkForCompanies[]> {
    if (
      isEqual(user.role, UserRole.PARTNER_COMPANY_EMPLOYEE_ADMIN) ||
      isEqual(user.role, UserRole.PARTNER_COMPANY_EMPLOYEE)
    ) {
      const query = this.createQueryBuilder('usersWorkForCompanies');
      const { companyId } = usersWorkForCompanies;

      query.where('usersWorkForCompanies.user = :userId', { user }); // userId

      query.where('usersWorkForCompanies.company = :companyId', { user }); // userId
      query.andWhere({ user });
      return query.getMany();
    }
  }
}
