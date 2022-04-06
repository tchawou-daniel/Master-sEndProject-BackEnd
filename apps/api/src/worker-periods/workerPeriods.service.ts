import { Get, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkerPeriods } from '@api/worker-periods/workerPeriods.entity';
import { WorkerPeriodsRepository } from '@api/worker-periods/workerPeriods.repository';
import { CreateWorkerPeriodsFilterDto } from '@api/worker-periods/dto/create-worker-periods-filter.dto';
import { User } from '@api/auth/user.entity';
import { GetWorkerPeriodsFilterDto } from '@api/worker-periods/dto/get-worker-periods.dto';

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


  createWorkerPeriods(createWorkerPeriodsDto: CreateWorkerPeriodsFilterDto, user: User): Promise<WorkerPeriods> {
    return this.workerPeriodRepository.createWorkerPeriods(createWorkerPeriodsDto, user);
  }
}
