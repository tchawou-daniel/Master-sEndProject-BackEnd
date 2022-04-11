import { WorkerPeriods } from '@api/worker-periods/workerPeriods.entity';
import { CreateWorkerDaysDto } from '@api/workerDays/dto/create-worker-days.dto';
import { GetWorkerDaysFilterDto } from '@api/workerDays/dto/get-workerDays-filter.dto';
import { WorkerDays } from '@api/workerDays/workerDays.entity';
import { WorkerDaysRepository } from '@api/workerDays/workerDays.repository';
import { Get, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { WorkerDayStatus } from '../../common/types/workerDays';

@Injectable()
export class WorkerDaysService {
  constructor(
    @InjectRepository(WorkerDaysRepository)
    private workerDaysRepository: WorkerDaysRepository,
  ) {}

  @Get()
  getWorkerDays(
    filterDto: GetWorkerDaysFilterDto,
    workerPeriod: WorkerPeriods,
  ): Promise<WorkerDays[]> {
    return this.workerDaysRepository.getWorkerDays(filterDto, workerPeriod);
  }

  async getWorkerDayById(
    id: string,
    workerPeriod: WorkerPeriods,
  ): Promise<WorkerDays> {
    const found = await this.workerDaysRepository.findOne({
      where: { id, workerPeriod },
    });
    if (!found) {
      throw new NotFoundException(`Worker day with ID "${id}" not found`);
    }
    return found;
  }

  createWorkerDay(
    createWorkerDayDto: CreateWorkerDaysDto,
    workerPeriod: WorkerPeriods,
  ): Promise<WorkerDays> {
    return this.workerDaysRepository.createWorkerDay(
      createWorkerDayDto,
      workerPeriod,
    );
  }

  async deleteWorkerDay(
    id: string,
    workerPeriods: WorkerPeriods,
  ): Promise<void> {
    const result = await this.workerDaysRepository.delete({
      id,
      workerPeriods,
    });
    if (result.affected === 0) {
      throw new NotFoundException(`Worker day with ID "${id}" not found`);
    }
  }

  async updateWorkerDaysStatus(
    id: string,
    status: WorkerDayStatus,
    workerPeriod: WorkerPeriods,
  ): Promise<WorkerDays> {
    const workerDays = await this.getWorkerDayById(id, workerPeriod);

    workerDays.workerDayStatus = status;
    await this.workerDaysRepository.save(workerDays);

    return workerDays;
  }
}
