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

    const query = this.createQueryBuilder('worker_days');
    query.where({ workerPeriod });

    if (numberOfHours) {
      query.andWhere('worker_days.numberOfHours = :nbHours', { numberOfHours });
    }

    if (startTime) {
      query.andWhere('worker_days.startTime = :startTime', { startTime });
    }

    if (endTime) {
      query.andWhere('worker_days.endTime = :endTime', { endTime });
    }
    if (weekday) {
      query.andWhere('worker_days.weekday = :weekday', { weekday });
    }

    if (status) {
      query.andWhere('worker_days.workerDayStatus = :workerDayStatus', {
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
