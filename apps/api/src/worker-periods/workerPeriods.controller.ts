import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { WorkerPeriods } from '@api/worker-periods/workerPeriods.entity';
import { WorkerPeriodsService } from '@api/worker-periods/workerPeriods.service';
import { User } from '@api/auth/user.entity';
import { GetUser } from '@api/auth/get-user.decorator';
import { GetWorkerPeriodsFilterDto } from '@api/worker-periods/dto/get-worker-periods.dto';
import { CreateWorkerPeriodsFilterDto } from '@api/worker-periods/dto/create-worker-periods-filter.dto';

@Controller('worker-periods')
export class WorkerPeriodsController {
  constructor(private workerPeriodsService: WorkerPeriodsService) {}
  @Get()
  getWorkerPeriods(
    @Query() filterDto: GetWorkerPeriodsFilterDto,
    @GetUser() user: User,
  ):Promise<WorkerPeriods[]>{
    return this.workerPeriodsService.getWorkerPeriods(filterDto, user);
  }

  @Post()
  createWorkerPeriods(
    @Body() createWorkerDto: CreateWorkerPeriodsFilterDto,
    @GetUser() user: User,
  ): Promise<WorkerPeriods>{
    return this.workerPeriodsService.createWorkerPeriods(createWorkerDto, user);
  }

}
