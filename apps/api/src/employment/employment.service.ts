import { User } from '@api/auth/user.entity';
import { CreateEmploymentDto } from '@api/employment/dto/create-employment.dto';
import { GetEmploymentsFilterDto } from '@api/employment/dto/get-employments-filter.dto';
import { Employment } from '@api/employment/employment.entity';
import { EmploymentRepository } from '@api/employment/employment.repository';
import { Get, Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EmploymentService {
  constructor(
    @InjectRepository(EmploymentRepository)
    private employementRepository: EmploymentRepository,
  ) {}

  @Get()
  getEmployments(
    filterDto: GetEmploymentsFilterDto,
    user: User,
  ): Promise<Employment[]> {
    return this.employementRepository.getEmployements(filterDto, user);
  }

  @Post()
  createEmployment(
    createEmploymentDto: CreateEmploymentDto,
    user: User,
  ): Promise<Employment> {
    return this.employementRepository.createEmployment(
      createEmploymentDto,
      user,
    );
  }
}
