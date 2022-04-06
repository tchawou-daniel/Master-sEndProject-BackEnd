import { Get, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkerPeriods } from '@api/worker-periods/workerPeriods.entity';
import { WorkerPeriodsRepository } from '@api/worker-periods/workerPeriods.repository';
import { CreateWorkerPeriodsFilterDto } from '@api/worker-periods/dto/create-worker-periods-filter.dto';
import { User } from '@api/auth/user.entity';
import { GetWorkerPeriodsFilterDto } from '@api/worker-periods/dto/get-worker-periods.dto';
import { WorkerPeriodStatus } from '../../common/types/workerPeriods';

@Injectable()
export class WorkerPeriodsService {
  constructor(
    @InjectRepository(WorkerPeriodsRepository)
    private workerPeriodRepository: WorkerPeriodsRepository,
  ) {}

  @Get()
  getWorkerPeriods(filterDto: GetWorkerPeriodsFilterDto, user: User): Promise<WorkerPeriods[]> {
    return this.workerPeriodRepository.getWorkerPeriods(filterDto, user);
  }

  createWorkerPeriod(createWorkerPeriodsDto: CreateWorkerPeriodsFilterDto, user: User): Promise<WorkerPeriods> {
    return this.workerPeriodRepository.createWorkerPeriod(createWorkerPeriodsDto, user);
  }

  async getWorkerPeriodById(id: string, user: User): Promise<WorkerPeriods> {
    const found = await this.workerPeriodRepository.findOne({ where: { id, user } });
    if (!found) {
      throw new NotFoundException(`Worker Period with ID "${id}" not found`);
    }
    return found;
  }

  async updateWorkerPeriod(
    id: string,
    status: WorkerPeriodStatus,
    user: User,
  ):Promise<WorkerPeriods> {
    const workerPeriods = await this.getWorkerPeriodById(id, user);
    workerPeriods.workerPeriodStatus = status;
    await this.workerPeriodRepository.save(workerPeriods);

    return workerPeriods;
  }

  // we have firstly to delete date attach to this before and if we don't have date attach we can delete without problem
  // async deleteWorkerPeriods(id: string, user: User): Promise<void> {
  //   const result = await this.workerPeriodRepository.delete({id, user});
  //   if(result.affected === 0) {
  //     throw new NotFoundException(`Worker Periods with ID "${id}" not found`);
  //   }
  // }
}
