import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { WorkerPeriods } from '@api/worker-periods/workerPeriods.entity';
import { WorkerPeriodsService } from '@api/worker-periods/workerPeriods.service';
import { User } from '@api/auth/user.entity';
import { GetUser } from '@api/auth/get-user.decorator';
import { GetWorkerPeriodsFilterDto } from '@api/worker-periods/dto/get-worker-periods.dto';
import { CreateWorkerPeriodsFilterDto } from '@api/worker-periods/dto/create-worker-periods-filter.dto';
import { UpdateWorkerPeriodsStatusDto } from '@api/worker-periods/dto/update-worker-periods-status.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('worker-periods')
@UseGuards(AuthGuard())
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
    return this.workerPeriodsService.createWorkerPeriod(createWorkerDto, user);
  }

  @Patch('/:id/status')
  updateWorkerPeriodStatus(
    @Param('id') id: string,
    @GetUser() user: User,
    @Body() updateWorkerStatusDto: UpdateWorkerPeriodsStatusDto,
  ): Promise<WorkerPeriods> {
    const {status} = updateWorkerStatusDto;
    return this.workerPeriodsService.updateWorkerPeriod(id, status, user);
  }


}
