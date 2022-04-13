import { User } from '@api/auth/user.entity';
import { WorkerPeriodsFilterDto } from '@api/worker-periods/dto/worker-periods-filter.dto';
import { GetWorkerPeriodsFilterDto } from '@api/worker-periods/dto/get-worker-periods.dto';
import { WorkerPeriods } from '@api/worker-periods/workerPeriods.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(WorkerPeriods)
export class WorkerPeriodsRepository extends Repository<WorkerPeriods> {
  async getWorkerPeriods(
    filterDto: GetWorkerPeriodsFilterDto,
    user: User,
  ): Promise<WorkerPeriods[]> {
    const { status, search } = filterDto;

    const query = this.createQueryBuilder('workerPeriods');
    query.where({ user });

    if (status) {
      query.andWhere('workerPeriods.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(workerPeriods.title) LIKE LOWER(:search) OR LOWER(workerPeriods.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    const workerPeriods = await query.getMany();
    return workerPeriods;
  }

  async createWorkerPeriod(
    createWorkerPeriods: WorkerPeriodsFilterDto,
    user: User,
  ): Promise<WorkerPeriods> {
    const { effectiveAsOf, effectiveUntil, numberOfHours, workerPeriodStatus } =
      createWorkerPeriods;
    const workerPeriods = this.create({
      effectiveAsOf,
      effectiveUntil,
      workerPeriodStatus,
      numberOfHours,
      user,
    });
    await this.save(workerPeriods);
    return workerPeriods;
  }
}
