import { UsersWorkForCompaniesRepository } from '@api/usersWorkForCompanies/usersWorkForCompanies.repository';
import { Get, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersWorkForCompaniesService {
  constructor(
        @InjectRepository(UsersWorkForCompaniesRepository)
        private usersWorkForCompaniesRepository: UsersWorkForCompaniesRepository,
  ) {}
}
