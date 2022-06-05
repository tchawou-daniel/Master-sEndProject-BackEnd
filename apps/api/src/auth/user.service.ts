import { GetUsersFliterDto } from '@api/auth/dto/get-users-fliter.dto';
import { User } from '@api/auth/user.entity';
import { UsersRepository } from '@api/auth/users.repository';
import { Get, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

export class UserService {
  constructor(
    @InjectRepository(UsersRepository)
    private userRepository: UsersRepository,
  ) {}

  @Get()
  getUsers(filterDto?: GetUsersFliterDto): Promise<User[]> {
    return this.userRepository.getUsers(filterDto);
  }

  async getUserById(id: string): Promise<User> {
    const found = await this.userRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return found;
  }

  async getUserByEmail(email: string): Promise<User> {
    const found = await this.userRepository.findOne({ where: { email } });

    if (!found) {
      throw new NotFoundException(`User with ID "${email}" not found`);
    }
    return found;
  }

  async updateUserAfterConnection(id: string): Promise<User> {
    const userFromDb = await this.getUserById(id);

    if (!userFromDb.joinedAt) {
      userFromDb.joinedAt = new Date();
    }
    await this.userRepository.save(userFromDb);

    userFromDb.lastConnection = new Date();
    return userFromDb;
  }
}
