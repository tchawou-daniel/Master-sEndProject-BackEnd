import { EmploymentDaysDto } from '@api/employmentDays/dto/employmentDays.dto';
import { EmploymentDays } from '@api/employmentDays/employmentDays.entity';
import { EmploymentPeriods } from '@api/employmentPeriods/employmentPeriods.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(EmploymentDays)
export class EmploymentDaysRepository extends Repository<EmploymentDays> {
  async getEmploymentDays(
    filterDto: EmploymentDaysDto,
    employmentPeriod: EmploymentPeriods,
  ): Promise<EmploymentDays[]> {
    const { numberOfHours, startTime, endTime, weekday, status } = filterDto;

    const query = this.createQueryBuilder('employmentDays');
    query.where({ employmentPeriod });

    if (numberOfHours) {
      query.andWhere('employmentDays.numberOfHours = :nbHours', {
        numberOfHours,
      });
    }

    if (startTime) {
      query.andWhere('employmentDays.startTime = :startTime', { startTime });
    }

    if (endTime) {
      query.andWhere('employmentDays.endTime = :endTime', { endTime });
    }
    if (weekday) {
      query.andWhere('employmentDays.weekday = :weekday', { weekday });
    }

    if (status) {
      query.andWhere(
        'employmentDays.employmentDayStatus = :employmentDayStatus',
        {
          status,
        },
      );
    }

    const employmentDays = await query.getMany();
    return employmentDays;
  }

  async createEmploymentDay(
    createEmploymentDayDto: EmploymentDaysDto,
    employmentPeriods: EmploymentPeriods,
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
    });
    await this.save(employmentDay);
    return employmentDay;
  }
}
