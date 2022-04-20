import { User } from '@api/auth/user.entity';
import { Company } from '@api/company/company.entity';
import { UpdateEmploymentPeriodDto } from '@api/employmentPeriods/dto/update-employment-period.dto';
import { EmploymentPeriods } from '@api/employmentPeriods/employmentPeriods.entity';
import { CreateUsersWorkForCompaniesDto } from '@api/usersWorkForCompanies/dto/create-usersWorkForCompanies.dto';
import { GetUsersWorkForComponiesFilterDto } from '@api/usersWorkForCompanies/dto/get-usersWorkForComponaies-filter.dto';
import { UpdateUsersWorkForCompaniesDto } from '@api/usersWorkForCompanies/dto/update-usersWorkForCompanies.dto';
import { UsersWorkForCompanies } from '@api/usersWorkForCompanies/usersWorkForCompanies.entity';
import { UsersWorkForCompaniesRepository } from '@api/usersWorkForCompanies/usersWorkForCompanies.repository';
import { Get, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersWorkForCompaniesService {
  constructor(
    @InjectRepository(UsersWorkForCompaniesRepository)
    private usersWorkForCompaniesRepository: UsersWorkForCompaniesRepository,
  ) {}

  @Get()
  getUsersWorkForCompanies(
    filterDto: GetUsersWorkForComponiesFilterDto,
    user: User,
  ): Promise<UsersWorkForCompanies[]> {
    return this.usersWorkForCompaniesRepository.getUsersWorkForCompanies(
      filterDto,
      user,
    );
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

    const { scoreCompany, companyReviews, workerReviews } =
      updateUsersWorkForCompaniesDto;

    usersWorkForCompany.scoreCompany = scoreCompany;
    usersWorkForCompany.companyReviews = companyReviews;
    usersWorkForCompany.workerReviews = workerReviews;

    await this.usersWorkForCompaniesRepository.save(usersWorkForCompany);

    return usersWorkForCompany;
  }
}
