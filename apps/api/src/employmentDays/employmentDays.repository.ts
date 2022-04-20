import { User } from '@api/auth/user.entity';
import { CreateEmploymentDaysDto } from '@api/employmentDays/dto/create-employment-days.dto';
import { EmploymentDays } from '@api/employmentDays/employmentDays.entity';
import { EmploymentPeriods } from '@api/employmentPeriods/employmentPeriods.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(EmploymentDays)
export class EmploymentDaysRepository extends Repository<EmploymentDays> {
  async getEmploymentDays(
    filterDto: CreateEmploymentDaysDto,
  ): Promise<EmploymentDays[]> {
    const { numberOfHours, startTime, endTime, weekday, status } = filterDto;

    const query = this.createQueryBuilder('employmentDays');

    if (numberOfHours) {
      query.andWhere('employment_days.numberOfHours = :nbHours', {
        numberOfHours,
      });
    }

    if (startTime) {
      query.andWhere('employment_days.startTime = :startTime', { startTime });
    }

    if (endTime) {
      query.andWhere('employment_days.endTime = :endTime', { endTime });
    }
    if (weekday) {
      query.andWhere('employment_days.weekday = :weekday', { weekday });
    }

    if (status) {
      query.andWhere(
        'employment_days.employmentDayStatus = :employmentDayStatus',
        {
          status,
        },
      );
    }

    const employmentDays = await query.getMany();
    return employmentDays;
  }

  async createEmploymentDay(
    createEmploymentDayDto: CreateEmploymentDaysDto,
    employmentPeriods: EmploymentPeriods,
    user: User,
  ): Promise<EmploymentDays> {
    const { startTime, endTime, weekday, numberOfHours, status } =
      createEmploymentDayDto;

    const employmentDay = this.create({
      endTime,
      startTime,
      weekday,
      employmentPeriods,
      numberOfHours,
      employmentDayStatus: status,
      user,
    });
    await this.save(employmentDay);
    return employmentDay;
  }
}
