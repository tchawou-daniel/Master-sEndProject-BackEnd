import { User } from '@api/auth/user.entity';
import { CreateEmploymentDto } from '@api/employment/dto/create-employment.dto';
import { GetEmploymentsFilterDto } from '@api/employment/dto/get-employments-filter.dto';
import { Employment } from '@api/employment/employment.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Employment)
export class EmploymentRepository extends Repository<Employment> {
  async getEmployements(
    filterDto: GetEmploymentsFilterDto,
    user: User,
  ): Promise<Employment[]> {
    const { hiringStatus, search } = filterDto;

    const query = this.createQueryBuilder('employment');

    if (hiringStatus) {
      query.andWhere('employment.hiringStatus = :hiringStatus', {
        hiringStatus,
      });
    }

    if (search) {
      query.andWhere(
        '(LOWER(employment.name) LIKE LOWER(:search) OR LOWER(employment.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    const employments = await query.getMany();
    return employments;
  }

  async createEmployment(
    createEmploymentDto: CreateEmploymentDto,
    user: User,
  ): Promise<Employment> {
    const {
      name,
      description,
      country,
      town,
      street,
      zipCode,
      employmentSector,
      hiringStatus,
      clearedAt,
      updatedAt,
      createdAt,
      companyName,
      hasManySubsidiaries,
    } = createEmploymentDto;

    const employment = this.create({
      name,
      description,
      country,
      town,
      street,
      zipCode,
      employmentSector,
      hiringStatus,
      clearedAt,
      updatedAt,
      createdAt,
      companyName,
      hasManySubsidiaries,
    });
    await this.save(employment);
    return employment;
  }
}
