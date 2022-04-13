import { User } from '@api/auth/user.entity';
import { GetUsersWorkForComponiesFilterDto } from '@api/usersWorkForCompanies/dto/get-usersWorkForComponaies-filter.dto';
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
}
