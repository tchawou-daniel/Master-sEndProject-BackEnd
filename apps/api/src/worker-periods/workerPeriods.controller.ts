import { GetUser } from '@api/auth/get-user.decorator';
import { User } from '@api/auth/user.entity';
import { GetWorkerPeriodsFilterDto } from '@api/worker-periods/dto/get-worker-periods-filter.dto';
import { UpdateWorkerPeriodsDto } from '@api/worker-periods/dto/update-worker-periods.dto';
import { WorkerPeriods } from '@api/worker-periods/workerPeriods.entity';
import { WorkerPeriodsService } from '@api/worker-periods/workerPeriods.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateWorkerPeriodsDto } from '@api/worker-periods/dto/create-worker-periods.dto';

@Controller('api/v0/workerPeriods')
@UseGuards(AuthGuard())
export class WorkerPeriodsController {
  constructor(private workerPeriodsService: WorkerPeriodsService) {}

  @Get()
  getWorkerPeriods(
    @Query() filterDto: GetWorkerPeriodsFilterDto,
    @GetUser() user: User,
  ): Promise<WorkerPeriods[]> {
    return this.workerPeriodsService.getWorkerPeriods(filterDto, user);
  }

  @Get('/:id')
  getWorkerPeriodById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<WorkerPeriods> {
    return this.workerPeriodsService.getWorkerPeriodById(id, user);
  }

  @Post()
  createWorkerPeriods(
    @Body() createWorkerDto: CreateWorkerPeriodsDto,
    @GetUser() user: User,
  ): Promise<WorkerPeriods> {
    return this.workerPeriodsService.createWorkerPeriod(createWorkerDto, user);
  }

  @Patch('/:id')
  updateWorkerPeriodStatus(
    @Param('id') id: string,
    @GetUser() user: User,
    @Body() updateWorkerStatusDto: UpdateWorkerPeriodsDto,
  ): Promise<WorkerPeriods> {
    return this.workerPeriodsService.updateWorkerPeriod(
      id,
      updateWorkerStatusDto,
      user,
    );
  }
}
