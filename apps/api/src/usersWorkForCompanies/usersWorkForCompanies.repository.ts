import { User } from '@api/auth/user.entity';
import { CreateUsersWorkForCompaniesDto } from '@api/usersWorkForCompanies/dto/create-usersWorkForCompanies.dto';
import { GetUsersWorkForComponiesFilterDto } from '@api/usersWorkForCompanies/dto/get-usersWorkForComponaies-filter.dto';
import { UsersWorkForCompanies } from '@api/usersWorkForCompanies/usersWorkForCompanies.entity';
import { Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(UsersWorkForCompanies)
export class UsersWorkForCompaniesRepository extends Repository<UsersWorkForCompanies> {
  private logger = new Logger('UsersWorkForCompaniesRepository');

  async getUsersWorkForCompanies(
    filterDto?: GetUsersWorkForComponiesFilterDto,
    user?: User,
  ): Promise<UsersWorkForCompanies[]> {
    const { scoreCompany, companyReviews, workerReviews } = filterDto || {};

    this.logger.verbose({ user });

    const query = this.createQueryBuilder('usersWorkForCompanies');
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
    this.logger.verbose({ usersWorkForCompanies });

    return usersWorkForCompanies;
  }

  // ##############       TEMPORARY_WORKER || PERMANENT_WORKER                  ##############
  async getUsersWorkForASpecificCompany(
    companyId: string,
  ): Promise<UsersWorkForCompanies[]> {
    const query = this.createQueryBuilder('usersWorkForCompanies');
    query.where('usersWorkForCompanies.companyId = :companyId', { companyId });

    return query.getMany();
  }

  // ##############   PARTNER_COMPANY_EMPLOYEE, PARTNER_COMPANY_EMPLOYEE_ADMIN  ##############
  // find workers of my company
  // async getWorkerOfACompany(
  //   filterDto: GetUsersWorkForComponiesFilterDto,
  //   company: Company,
  //   usersWorkForCompanies: UsersWorkForCompanies,
  //   user: User,
  // ): Promise<UsersWorkForCompanies[]> {
  //   if (
  //     isEqual(user.role, UserRole.PARTNER_COMPANY_EMPLOYEE_ADMIN) ||
  //     isEqual(user.role, UserRole.PARTNER_COMPANY_EMPLOYEE)
  //   ) {
  //     const query = this.createQueryBuilder('usersWorkForCompanies');
  //     const { companyId } = usersWorkForCompanies;
  //
  //     query.where('usersWorkForCompanies.user = :userId', { user }); // userId
  //
  //     query.where('usersWorkForCompanies.company = :companyId', { user }); // userId
  //     query.andWhere({ user });
  //     return query.getMany();
  //   }
  // }

  async createUsersWorkForComany(
    createUsersWorkForCompanies: CreateUsersWorkForCompaniesDto,
    user: User,
  ): Promise<UsersWorkForCompanies> {
    const { scoreCompany, companyReviews, workerReviews, companyId, userId } =
      createUsersWorkForCompanies;

    const usersWorkForCompanies = this.create({
      scoreCompany,
      companyReviews,
      workerReviews,
      userId,
      companyId,
    });

    await this.save(usersWorkForCompanies);
    return usersWorkForCompanies;
  }

  async getUserWorkForCompanyByIds(
    companyId: string,
    userId: string,
  ): Promise<UsersWorkForCompanies> {
    const query = this.createQueryBuilder('usersWorkForCompanies');
    query.where('usersWorkForCompanies.companyId = :companyId', { companyId });
    query.andWhere('usersWorkForCompanies.userId = :userId', {
      userId,
    });
    const result = await query.getOne();
    Logger.log(result);
    return result;
  }

  async deleteAUserCompany(
    userId: string,
    companyId: string,
    user: User,
  ): Promise<void> {
    const query = this.createQueryBuilder('usersWorkForCompanies');
    await this.createQueryBuilder()
      .delete()
      .from(UsersWorkForCompanies)
      .where('usersWorkForCompanies.userId = :userId', {
        userId,
      })
      .andWhere('usersWorkForCompanies.companyId = :companyId', {
        companyId,
      })
      .execute();
  }
}
