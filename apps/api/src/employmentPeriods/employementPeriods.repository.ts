import { EmploymentDaysDto } from '@api/employmentDays/dto/employmentDays.dto';
import { EmploymentDays } from '@api/employmentDays/employmentDays.entity';
import { EmploymentPeriods } from '@api/employmentPeriods/employmentPeriods.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(EmploymentDays)
export class WorkerDaysRepository extends Repository<EmploymentDays> {
  async getEmploymentDays(
    filterDto: EmploymentDaysDto,
    employmentPeriods: EmploymentPeriods,
  ): Promise<EmploymentDays[]> {
    const { numberOfHours, startTime, endTime, weekday, status } = filterDto;

    const query = this.createQueryBuilder('workerDays');
    query.where({ employmentPeriods });

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

    const workerDays = await query.getMany();
    return workerDays;
  }

  async createEmploymentDays(
    createWorkerDayDto: EmploymentDaysDto,
    employmentPeriods: EmploymentPeriods,
  ): Promise<EmploymentDays> {
    const { startTime, endTime, weekday, numberOfHours, status } =
      createWorkerDayDto;

    const workerDay = this.create({
      employmentPeriods,
      employmentDayStatus: status,
      endTime,
      weekday,
      numberOfHours,
      startTime,
    });
    await this.save(workerDay);
    return workerDay;
  }
}
