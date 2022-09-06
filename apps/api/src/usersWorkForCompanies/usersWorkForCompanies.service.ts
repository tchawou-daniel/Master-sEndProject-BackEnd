import { User } from '@api/auth/user.entity';
import { CreateUsersWorkForCompaniesDto } from '@api/usersWorkForCompanies/dto/create-usersWorkForCompanies.dto';
import { GetUsersWorkForComponiesFilterDto } from '@api/usersWorkForCompanies/dto/get-usersWorkForComponaies-filter.dto';
import { UpdateUsersWorkForCompaniesDto } from '@api/usersWorkForCompanies/dto/update-usersWorkForCompanies.dto';
import { UsersWorkForCompanies } from '@api/usersWorkForCompanies/usersWorkForCompanies.entity';
import { UsersWorkForCompaniesRepository } from '@api/usersWorkForCompanies/usersWorkForCompanies.repository';
import { Get, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersWorkForCompaniesService {
  private logger = new Logger('UsersWorkForCompaniesService');

  constructor(
    @InjectRepository(UsersWorkForCompaniesRepository)
    private usersWorkForCompaniesRepository: UsersWorkForCompaniesRepository,
  ) {}

  @Get()
  getUsersWorkForCompanies(
    user: User,
    filterDto?: GetUsersWorkForComponiesFilterDto,
  ): Promise<UsersWorkForCompanies[]> {
    // this.logger.verbose({ user });
    return this.usersWorkForCompaniesRepository.getUsersWorkForCompanies(
      filterDto,
      user,
    );
  }

  async getUsersWorkForASpecificCompany(
    companyId: string,
  ): Promise<UsersWorkForCompanies[]> {
    const found =
      await this.usersWorkForCompaniesRepository.getUsersWorkForASpecificCompany(
        companyId,
      );
    if (!found) {
      throw new NotFoundException(
        `User work for company with ID "${companyId}" not found`,
      );
    }
    return found;
  }

  async getASpecificUserWorkForCompany(
    companyId: string,
    userId: string,
  ): Promise<UsersWorkForCompanies> {
    const found =
      await this.usersWorkForCompaniesRepository.getUserWorkForCompanyByIds(
        companyId,
        userId,
      );
    return found;
  }

  async getUserWorkForCompaniesById(
    id: string,
    user: User,
  ): Promise<UsersWorkForCompanies> {
    const found = await this.usersWorkForCompaniesRepository.findOne({
      id,
      user,
    });
    if (!found) {
      throw new NotFoundException(
        `User work for company with ID "${id}" not found`,
      );
    }
    return found;
  }

  createUsersWorkForCompany(
    createUsersWorkForCompaniesDto: CreateUsersWorkForCompaniesDto,
    user: User,
  ): Promise<UsersWorkForCompanies> {
    return this.usersWorkForCompaniesRepository.createUsersWorkForComany(
      createUsersWorkForCompaniesDto,
      user,
    );
  }

  async updateUsersWorkForCompaniesService(
    id: string,
    updateUsersWorkForCompaniesDto: UpdateUsersWorkForCompaniesDto,
    user: User,
  ): Promise<UsersWorkForCompanies> {
    const usersWorkForCompany = await this.getUserWorkForCompaniesById(
      id,
      user,
    );

    const { scoreCompany, companyReviews, workerReviews, userId, companyId } =
      updateUsersWorkForCompaniesDto;

    usersWorkForCompany.scoreCompany = scoreCompany;
    usersWorkForCompany.companyReviews = companyReviews;
    usersWorkForCompany.workerReviews = workerReviews;
    usersWorkForCompany.userId = userId;
    usersWorkForCompany.companyId = companyId;

    await this.usersWorkForCompaniesRepository.save(usersWorkForCompany);

    return usersWorkForCompany;
  }

  async delete(userId: string, companyId: string, user: User): Promise<void> {
    await this.usersWorkForCompaniesRepository.deleteAUserCompany(
      userId,
      companyId,
      user,
    );
  }
}
