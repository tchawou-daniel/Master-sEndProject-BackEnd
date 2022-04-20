import { User } from '@api/auth/user.entity';
import { Company } from '@api/company/company.entity';
import { CreateEmploymentDto } from '@api/employment/dto/create-employment.dto';
import { GetEmploymentsFilterDto } from '@api/employment/dto/get-employments-filter.dto';
import { UpdateEmploymentStatusDto } from '@api/employment/dto/update-employment-status.dto';
import { UpdateEmploymentDto } from '@api/employment/dto/update-employment.dto';
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

  // restreindre au niveau des autres users(employées, partner employee...)
  // egalement pour les autres fonctions
  @Get()
  async getEmploymentById(
    id: string,
    user?: User,
    company?: Company,
  ): Promise<Employment> {
    if (user && company) {
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
          return foundFromAdminUser;
        }
      } else {
        return foundFromCurrentUser;
      }
    }
  }

  @Get()
  getEmploymentsByCompanyId(
    id: string,
    filterDto: GetEmploymentsFilterDto,
    company: Company,
    user?: User,
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

  @Post()
  createEmployment(
    createEmploymentDto: CreateEmploymentDto,
    user: User,
  ): Promise<Employment> {
    return this.employmentRepository.createEmployment(
      createEmploymentDto,
      user,
    );

    throw new NotFoundException(`Not found`);
  }

  async updateEmploymentStatus(
    id: string,
    updateEmploymentStatusDto: UpdateEmploymentStatusDto,
  ): Promise<Employment> {
    const employment = await this.getEmploymentById(id);
    employment.hiringStatus = updateEmploymentStatusDto.hiringStatus;
    await this.employmentRepository.save(employment);
    return employment;
  }

  async updateEmployment(
    id: string,
    updateEmploymentDto: UpdateEmploymentDto,
  ): Promise<Employment> {
    const employment = await this.getEmploymentById(id);
    employment.hiringStatus = updateEmploymentDto.hiringStatus;
    employment.employmentSector = updateEmploymentDto.employmentSector;
    employment.zipCode = updateEmploymentDto.zipCode;
    employment.street = updateEmploymentDto.street;
    employment.town = updateEmploymentDto.town;
    employment.description = updateEmploymentDto.description;
    employment.hasManySubsidiaries = updateEmploymentDto.hasManySubsidiaries;
    employment.name = updateEmploymentDto.name;
    employment.country = updateEmploymentDto.country;

    await this.employmentRepository.save(employment);
    return employment;
  }

  async deleteEmployment(id: string): Promise<void> {
    const result = await this.employmentRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Employment with ID "${id}" not found`);
    }
  }
}
