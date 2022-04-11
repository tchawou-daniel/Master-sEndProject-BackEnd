import { WorkerPeriods } from '@api/worker-periods/workerPeriods.entity';
import { CreateWorkerDaysDto } from '@api/workerDays/dto/create-worker-days.dto';
import { GetWorkerDaysFilterDto } from '@api/workerDays/dto/get-workerDays-filter.dto';
import { WorkerDays } from '@api/workerDays/workerDays.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(WorkerDays)
export class WorkerDaysRepository extends Repository<WorkerDays> {
  async getWorkerDays(
    filterDto: GetWorkerDaysFilterDto,
    workerPeriod: WorkerPeriods,
  ): Promise<WorkerDays[]> {
    const { numberOfHours, startTime, endTime, weekday, workerDayStatus } =
      filterDto;

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

    if (weekday) {
      query.andWhere('workerDays.weekday = :weekday', { weekday });
    }

    if (workerDayStatus) {
      query.andWhere('workerDays.workerDayStatus = :workerDayStatus', {
        workerDayStatus,
      });
    }

    const workerDays = await query.getMany();
    return workerDays;
  }

  async createWorkerDay(
    createWorkerDayDto: CreateWorkerDaysDto,
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
