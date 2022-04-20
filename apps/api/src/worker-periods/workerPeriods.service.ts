import { User } from '@api/auth/user.entity';
import { GetWorkerPeriodsFilterDto } from '@api/worker-periods/dto/get-worker-periods-filter.dto';
import { UpdateWorkerPeriodsDto } from '@api/worker-periods/dto/update-worker-periods.dto';
import { WorkerPeriods } from '@api/worker-periods/workerPeriods.entity';
import { WorkerPeriodsRepository } from '@api/worker-periods/workerPeriods.repository';
import { Get, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateWorkerPeriodsDto } from '@api/worker-periods/dto/create-worker-periods.dto';

@Injectable()
export class WorkerPeriodsService {
  constructor(
    @InjectRepository(WorkerPeriodsRepository)
    private workerPeriodRepository: WorkerPeriodsRepository,
  ) {}

  @Get()
  getWorkerPeriods(
    filterDto: GetWorkerPeriodsFilterDto,
    user: User,
  ): Promise<WorkerPeriods[]> {
    return this.workerPeriodRepository.getWorkerPeriods(filterDto, user);
  }

  createWorkerPeriod(
    createWorkerPeriodsDto: CreateWorkerPeriodsDto,
    user: User,
  ): Promise<WorkerPeriods> {
    return this.workerPeriodRepository.createWorkerPeriod(
      createWorkerPeriodsDto,
      user,
    );
  }

  async getWorkerPeriodById(id: string, user: User): Promise<WorkerPeriods> {
    const found = await this.workerPeriodRepository.findOne({
      where: { id, user },
    });
    if (!found) {
      throw new NotFoundException(`Worker Period with ID "${id}" not found`);
    }
    return found;
  }

  async updateWorkerPeriod(
    id: string,
    workerPeriodsFilterDto: UpdateWorkerPeriodsDto,
    user: User,
  ): Promise<WorkerPeriods> {
    const { workerPeriodStatus, numberOfHours, effectiveUntil, effectiveAsOf } =
      workerPeriodsFilterDto;
    const workerPeriods = await this.getWorkerPeriodById(id, user);
    if (workerPeriodStatus)
      workerPeriods.workerPeriodStatus = workerPeriodStatus;
    if (numberOfHours) workerPeriods.numberOfHours = numberOfHours;
    if (effectiveUntil) workerPeriods.effectiveUntil = effectiveUntil;
    if (effectiveAsOf) workerPeriods.effectiveAsOf = effectiveAsOf;
    await this.workerPeriodRepository.save(workerPeriods);

    return workerPeriods;
  }

  async deleteWorkerPeriods(id: string, user: User): Promise<void> {
    const result = await this.workerPeriodRepository.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException(`Worker Periods with ID "${id}" not found`);
    }
  }
}
