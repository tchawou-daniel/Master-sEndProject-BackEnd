import { GetWorkerDayFilterDto } from '@api/workerDays/dto/get-worker-day-filter.dto';
import { UpdateWorkerDaysDto } from '@api/workerDays/dto/update-workerDays.dto';
import { CreateWorkerDaysDto } from '@api/workerDays/dto/create-worker-days.dto';
import { WorkerDays } from '@api/workerDays/workerDays.entity';
import { WorkerDaysRepository } from '@api/workerDays/workerDays.repository';
import { Get, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { WorkerDayStatus } from '../../common/types/workerDays';

@Injectable()
export class WorkerDaysService {
  constructor(
    @InjectRepository(WorkerDaysRepository)
    private workerDaysRepository: WorkerDaysRepository,
  ) {}

  private logger = new Logger('WorkerDaysService');

  @Get()
  getWorkerDays(filterDto: GetWorkerDayFilterDto): Promise<WorkerDays[]> {
    return this.workerDaysRepository.getWorkerDays(filterDto);
  }

  async getWorkerDayById(id: string): Promise<WorkerDays> {
    const found = await this.workerDaysRepository.findOne({
      where: { id },
    });
    if (!found) {
      throw new NotFoundException(`Worker day with ID "${id}" not found`);
    }
    return found;
  }

  createWorkerDay(createWorkerDayDto: CreateWorkerDaysDto): Promise<WorkerDays> {
    this.logger.verbose(createWorkerDayDto);
    return this.workerDaysRepository.createWorkerDay(createWorkerDayDto);
  }

  async deleteWorkerDay(id: string): Promise<void> {
    const result = await this.workerDaysRepository.delete({
      id,
    });
    if (result.affected === 0) {
      throw new NotFoundException(`Worker day with ID "${id}" not found`);
    }
  }

  async updateWorkerDaysStatus(
    id: string,
    status: WorkerDayStatus,
  ): Promise<WorkerDays> {
    const workerDays = await this.getWorkerDayById(id);

    workerDays.workerDayStatus = status;
    await this.workerDaysRepository.save(workerDays);

    return workerDays;
  }

  async updateWorkerDay(
    id: string,
    updateWorkerkDayDto: UpdateWorkerDaysDto,
  ): Promise<WorkerDays> {
    const workerDays = await this.getWorkerDayById(id);
    workerDays.workerDayStatus = updateWorkerkDayDto.workerDayStatus;
    workerDays.weekday = updateWorkerkDayDto.weekday;
    workerDays.endTime = updateWorkerkDayDto.endTime;
    workerDays.startTime = updateWorkerkDayDto.startTime;
    workerDays.numberOfHours = updateWorkerkDayDto.numberOfHours;
    this.logger.verbose({ workerDays });
    await this.workerDaysRepository.save(workerDays);

    return workerDays;
  }
}
