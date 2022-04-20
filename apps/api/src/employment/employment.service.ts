import { User } from '@api/auth/user.entity';
import { Company } from '@api/company/company.entity';
import { EmploymentDto } from '@api/employment/dto/employment.dto';
import { GetEmploymentsFilterDto } from '@api/employment/dto/get-employments-filter.dto';
import { Employment } from '@api/employment/employment.entity';
import { EmploymentRepository } from '@api/employment/employment.repository';
import { Get, Injectable, NotFoundException, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEqual } from 'lodash';

import { UserRole } from '../../common/types/user';

@Injectable()
export class EmploymentService {
  constructor(
    @InjectRepository(EmploymentRepository)
    private employmentRepository: EmploymentRepository,
  ) {}

  @Get()
  getEmployments(
    filterDto: GetEmploymentsFilterDto,
    user?: User,
  ): Promise<Employment[]> {
    return this.employmentRepository.getEmployments(filterDto, null, user);
  }

  @Get()
  getEmploymentsByCompanyId(
    id: string,
    filterDto: GetEmploymentsFilterDto,
    user: User,
    company: Company,
  ): Promise<Employment[]> {
    // ceux qui ne sont pas de la company et qui ne sont pas
    const found = this.employmentRepository.getEmployments(
      filterDto,
      company,
      null,
    );
    if (!found) {
      throw new NotFoundException(
        `Employments with ID Company"${id}" not found`,
      );
    }
    return found;
  }

  // restreindre au niveau des autres users(employées, partner employee...)
  // egalement pour les autres fonctions
  @Get()
  async getEmploymentById(
    id: string,
    user: User,
    company: Company,
  ): Promise<Employment> {
    const foundFromCurrentUser = await this.employmentRepository.findOne({
      where: { id, user, company },
    });

    if (!foundFromCurrentUser) {
      if (
        isEqual(user.role, UserRole.ADMIN) ||
        isEqual(user.role, UserRole.EMPLOYMENT_AGENCY)
      ) {
        const foundFromAdminUser = await this.employmentRepository.findOne({
          where: { id, company },
        });
        if (!foundFromCurrentUser && !foundFromAdminUser) {
          throw new NotFoundException(`Employment with ID "${id}" not found`);
        }
      }
    }
    return this.employmentRepository.findOne(id);
  }

  @Post()
  createEmployment(
    createEmploymentDto: EmploymentDto,
    user: User,
    company: Company,
  ): Promise<Employment> {
    if (company) {
      return this.employmentRepository.createEmployment(
        createEmploymentDto,
        user,
        company,
      );
    }
    throw new NotFoundException(`Not found`);
  }

  async deleteEmployment(id: string): Promise<void> {
    const result = await this.employmentRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Employment with ID "${id}" not found`);
    }
  }

  async updateEmploymentStatus(
    id: string,
    company: Company,
    createdBy: User,
  ): Promise<Employment> {
    const employment = await this.getEmploymentById(id, createdBy, company);
    await this.employmentRepository.save(employment);
    return employment;
  }
}
