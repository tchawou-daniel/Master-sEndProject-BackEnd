import { CreateUserDto } from '@api/auth/dto/create-user.dto';
import { GetUsersFliterDto } from '@api/auth/dto/get-users-fliter.dto';
import { UpdateUserDto } from '@api/auth/dto/update-user.dto';
import { User } from '@api/auth/user.entity';
import { UsersRepository } from '@api/auth/users.repository';
import { Employment } from '@api/employment/employment.entity';
import {
  ForbiddenException,
  Get,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CompanyStatus } from '../../common/types/company';

export class UserService {
  constructor(
    @InjectRepository(UsersRepository)
    private userRepository: UsersRepository,
  ) {}

  @Get()
  getUsers(filterDto?: GetUsersFliterDto): Promise<User[]> {
    return this.userRepository.getUsers();
  }

  @Get()
  getWorkers(filterDto?: GetUsersFliterDto): Promise<User[]> {
    return this.userRepository.getWorkers(filterDto);
  }

  async getUserById(id: string): Promise<User> {
    const found = await this.userRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return found;
  }

  async updateMe(id: string, updateMeDto: UpdateUserDto): Promise<User> {
    const user = await this.getUserById(id);
    user.bio = updateMeDto.bio;
    user.lastName = updateMeDto.lastName;
    user.email = updateMeDto.email;
    user.firstName = updateMeDto.firstName;
    user.avatar = updateMeDto.avatar;

    await this.userRepository.save(user);
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    const found = await this.userRepository.findOne({ where: { email } });

    if (!found) {
      throw new NotFoundException(`User with ID "${email}" not found`);
    }
    return found;
  }

  async createAWorker(createUserDto: CreateUserDto): Promise<User> {
    const logger = new Logger('UsersRepository');
    logger.verbose(`User "${createUserDto}"`);
    return this.userRepository.createUser(createUserDto);
  }

  async updateAWorker(id: string, updateMeDto: UpdateUserDto): Promise<User> {
    const worker = await this.getUserById(id);
    worker.bio = updateMeDto.bio;
    worker.lastName = updateMeDto.lastName;
    worker.firstName = updateMeDto.firstName;
    worker.email = updateMeDto.email;
    worker.avatar = updateMeDto.avatar;

    await this.userRepository.save(worker);
    return worker;
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

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
