import { User } from '@api/auth/user.entity';
import { Company } from '@api/company/company.entity';
import { EmploymentDto } from '@api/employment/dto/employment.dto';
import { GetEmploymentsFilterDto } from '@api/employment/dto/get-employments-filter.dto';
import { Employment } from '@api/employment/employment.entity';
import { EmploymentRepository } from '@api/employment/employment.repository';
import { Get, Injectable, NotFoundException, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Hiring } from '../../common/types/employment';

@Injectable()
export class EmploymentService {
  constructor(
    @InjectRepository(EmploymentRepository)
    private employmentRepository: EmploymentRepository,
  ) {}

  @Get()
  getEmployments(
    filterDto: GetEmploymentsFilterDto,
    user: User,
  ): Promise<Employment[]> {
    return this.employmentRepository.getEmployements(filterDto, user);
  }

  @Get()
  async getEmploymentById(id: string, company: Company): Promise<Employment> {
    const found = await this.employmentRepository.findOne({
      where: { id, company },
    });
    if (!found) {
      throw new NotFoundException(`Employment with ID "${id}" not found`);
    }
    return this.employmentRepository.findOne(id);
  }

  @Post()
  createEmployment(
    createEmploymentDto: EmploymentDto,
    user: User,
  ): Promise<Employment> {
    return this.employmentRepository.createEmployment(
      createEmploymentDto,
      user,
    );
  }

  async deleteEmployment(id: string): Promise<void> {
    const result = await this.employmentRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Employment with ID "${id}" not found`);
    }
  }

  // check rights in front-end part
  async updateEmploymentStatus(
    id: string,
    company: Company,
  ): Promise<Employment> {
    const employment = await this.getEmploymentById(id, company);
    await this.employmentRepository.save(employment);

    return employment;
  }
}
