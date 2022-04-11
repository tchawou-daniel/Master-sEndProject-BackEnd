import { WorkerPeriods } from '@api/worker-periods/workerPeriods.entity';
import { WorkerDaysDto } from '@api/workerDays/dto/worker-days.dto';
import { WorkerDays } from '@api/workerDays/workerDays.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(WorkerDays)
export class WorkerDaysRepository extends Repository<WorkerDays> {
  async getWorkerDays(
    filterDto: WorkerDaysDto,
    workerPeriod: WorkerPeriods,
  ): Promise<WorkerDays[]> {
    const { numberOfHours, startTime, endTime, weekday, status } = filterDto;

    const query = this.createQueryBuilder('workerDays');
    query.where({ workerPeriod });

    if (numberOfHours) {
      query.andWhere('workerDays.numberOfHours = :nbHours', { numberOfHours });
    }

    if (startTime) {
      query.andWhere('workerDays.startTime = :startTime', { startTime });
    }

    if (endTime) {
      query.andWhere('workerDays.endTime = :endTime', { endTime });
    }
    if (weekday) {
      query.andWhere('workerDays.weekday = :weekday', { weekday });
    }

    if (status) {
      query.andWhere('workerDays.workerDayStatus = :workerDayStatus', {
        status,
      });
    }

    const workerDays = await query.getMany();
    return workerDays;
  }

  async createWorkerDay(
    createWorkerDayDto: WorkerDaysDto,
    workerPeriods: WorkerPeriods,
  ): Promise<WorkerDays> {
    const { startTime, endTime, weekday, numberOfHours, status } =
      createWorkerDayDto;

    const workerDay = this.create({
      endTime,
      startTime,
      workerDayStatus: status,
      numberOfHours,
      weekday,
      workerPeriods,
    });
    await this.save(workerDay);
    return workerDay;
  }
}
