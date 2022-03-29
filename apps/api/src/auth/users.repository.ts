import {
  ConflictException,
  InternalServerErrorException, Logger,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import {CreateUserDto} from "@api/auth/dto/create-user.dto";


@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<void> {
    const {firstName, lastName, email, password} = createUserDto;
    let logger = new Logger('UsersRepository');
    logger.verbose(`User "${CreateUserDto}"`)
    console.log(createUserDto)


    // hash
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({firstName, lastName, email, password: hashedPassword});
    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        // duplicate email
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
