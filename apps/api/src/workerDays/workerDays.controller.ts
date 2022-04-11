import { GetWorkerPeriods } from '@api/worker-periods/get-workerPeriods.decorator';
import { WorkerPeriods } from '@api/worker-periods/workerPeriods.entity';
import { CreateWorkerDaysDto } from '@api/workerDays/dto/create-worker-days.dto';
import { GetWorkerDaysFilterDto } from '@api/workerDays/dto/get-workerDays-filter.dto';
import { UpdateWorkerDaysStatusDto } from '@api/workerDays/dto/update-workerDays-status.dto';
import { WorkerDays } from '@api/workerDays/workerDays.entity';
import { WorkerDaysService } from '@api/workerDays/workerDays.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('workerDays')
export class WorkerDaysController {
  private logger = new Logger('WorkerDaysController');

  constructor(private workerDaysService: WorkerDaysService) {}

  @Get()
  getWorkerDays(
    @Query() filterDto: GetWorkerDaysFilterDto,
    @GetWorkerPeriods() workerPeriods: WorkerPeriods,
  ): Promise<WorkerDays[]> {
    this.logger.verbose(
      `"User ${
        workerPeriods.workerPeriodStatus
      }" retrieving all worker days Filters: ${JSON.stringify(filterDto)}`,
    );
    return this.workerDaysService.getWorkerDays(filterDto, workerPeriods);
  }

  @Get('/:id')
  getWorkerDayById(
    @Param('id') id: string,
    @GetWorkerPeriods() workerPeriods: WorkerPeriods,
  ): Promise<WorkerDays> {
    return this.workerDaysService.getWorkerDayById(id, workerPeriods);
  }

  @Post()
  createWorkerPeriod(
    @Body() createWorkerDayDto: CreateWorkerDaysDto,
    @GetWorkerPeriods() workerPeriods: WorkerPeriods,
  ): Promise<WorkerDays> {
    return this.workerDaysService.createWorkerDay(
      createWorkerDayDto,
      workerPeriods,
    );
  }

  @Delete('/:id')
  deleteWorkerDay(
    @Param('id') id: string,
    @GetWorkerPeriods() workerPeriods: WorkerPeriods,
  ): Promise<void> {
    return this.workerDaysService.deleteWorkerDay(id, workerPeriods);
  }

  @Patch('/:id/status')
  updateWorkerDayStatus(
    @Param('id') id: string,
    @GetWorkerPeriods() workerPeriods: WorkerPeriods,
    @Body() updateWorkerkStatusDto: UpdateWorkerDaysStatusDto,
  ): Promise<WorkerDays> {
    const { status } = updateWorkerkStatusDto;
    return this.workerDaysService.updateWorkerDaysStatus(id, status, workerPeriods);
  }
}
