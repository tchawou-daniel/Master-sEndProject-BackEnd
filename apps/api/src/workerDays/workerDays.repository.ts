import { WorkerPeriods } from '@api/worker-periods/workerPeriods.entity';
import { GetWorkerDayFilterDto } from '@api/workerDays/dto/get-worker-day-filter.dto';
import { CreateWorkerDaysDto } from '@api/workerDays/dto/create-worker-days.dto';
import { WorkerDays } from '@api/workerDays/workerDays.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(WorkerDays)
export class WorkerDaysRepository extends Repository<WorkerDays> {
  async getWorkerDays(filterDto: GetWorkerDayFilterDto): Promise<WorkerDays[]> {
    const { numberOfHours, startTime, endTime, weekday, workerDayStatus } =
      filterDto;

    const query = this.createQueryBuilder('worker_days');
    // query.where({ workerPeriod });

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

    if (workerDayStatus) {
      query.andWhere('worker_days.workerDayStatus = :workerDayStatus', {
        workerDayStatus,
      });
    }

    const workerDays = await query.getMany();
    return workerDays;
  }

  async createWorkerDay(
    createWorkerDayDto: CreateWorkerDaysDto,
  ): Promise<WorkerDays> {
    const {
      startTime,
      endTime,
      weekday,
      numberOfHours,
      workerDayStatus,
      workerPeriodsId,
    } = createWorkerDayDto;

    const workerDay = this.create({
      endTime,
      startTime,
      workerDayStatus,
      numberOfHours,
      weekday,
      workerPeriodsId,
    });
    await this.save(workerDay);
    return workerDay;
  }
}
