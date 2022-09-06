import { GetUsersFliterDto } from '@api/auth/dto/get-users-fliter.dto';
import {
  ConflictException,
  InternalServerErrorException, Logger,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { firstName, lastName, email, password, role } = authCredentialsDto;

    // hash
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      firstName,
      lastName,
      email,
      role,
      password: hashedPassword,
    });
    try {
      Logger.log(`abc${await this.save(user)}`);
      // return
      Logger.log(user);
      return user;
    } catch (error) {
      if (error.code === '23505') {
        // duplicate email
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getUsers(): Promise<User[]> {
    const query = this.createQueryBuilder('user');

    return query.getMany();
  }
  //
  // async updateAWorker():Promise<User[]> {
  //      return this.user.updateCompany(id, updateCompanyDto, user);
  // }

  async getWorkers(filterDto: GetUsersFliterDto, user?: User): Promise<User[]> {
    const query = this.createQueryBuilder('user');

    return query.getMany();
  }
}
