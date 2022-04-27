import { User } from '@api/auth/user.entity';
import { CreateWorkerPeriodsDto } from '@api/worker-periods/dto/create-worker-periods.dto';
import { GetWorkerPeriodsFilterDto } from '@api/worker-periods/dto/get-worker-periods-filter.dto';
import { WorkerPeriods } from '@api/worker-periods/workerPeriods.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(WorkerPeriods)
export class WorkerPeriodsRepository extends Repository<WorkerPeriods> {
  async getWorkerPeriods(
    filterDto: GetWorkerPeriodsFilterDto,
    user: User,
  ): Promise<WorkerPeriods[]> {
    const { status, search } = filterDto;

    const query = this.createQueryBuilder('worker_periods');
    query.where({ user });

    if (status) {
      query.andWhere('worker_periods.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(worker_periods.title) LIKE LOWER(:search) OR LOWER(worker_periods.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    const workerPeriods = await query.getMany();
    return workerPeriods;
  }

  async createWorkerPeriod(
    createWorkerPeriods: CreateWorkerPeriodsDto,
    user: User,
  ): Promise<WorkerPeriods> {
    const {
      effectiveAsOf,
      effectiveUntil,
      numberOfHours,
      numberOfDays,
      workerPeriodStatus,
    } = createWorkerPeriods;
    const workerPeriods = this.create({
      effectiveAsOf,
      effectiveUntil,
      workerPeriodStatus,
      numberOfHours,
      numberOfDays,
      user,
    });
    await this.save(workerPeriods);
    return workerPeriods;
  }
}
