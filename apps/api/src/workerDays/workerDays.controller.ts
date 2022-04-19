import { GetWorkerPeriods } from '@api/worker-periods/get-workerPeriods.decorator';
import { WorkerPeriods } from '@api/worker-periods/workerPeriods.entity';
import { GetWorkerDayFilterDto } from '@api/workerDays/dto/get-worker-day-filter.dto';
import { UpdateWorkerDaysStatusDto } from '@api/workerDays/dto/update-workerDays-status.dto';
import { WorkerDaysDto } from '@api/workerDays/dto/worker-days.dto';
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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v0/workerDays')
@UseGuards(AuthGuard('jwt'))
export class WorkerDaysController {
  private logger = new Logger('WorkerDaysController');

  constructor(private workerDaysService: WorkerDaysService) {}

  @Get()
  getWorkerDays(
    @Query() filterDto: GetWorkerDayFilterDto,
    @GetWorkerPeriods() workerPeriods: WorkerPeriods,
  ): Promise<WorkerDays[]> {
    this.logger.verbose(
      `"Worker Periods ${workerPeriods}" retrieving all worker days Filters: ${JSON.stringify(
        filterDto,
      )}`,
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
    @Body() createWorkerDayDto: WorkerDaysDto,
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
    @Body() updateWorkerkDayStatusDto: UpdateWorkerDaysStatusDto,
  ): Promise<WorkerDays> {
    const { status } = updateWorkerkDayStatusDto;
    return this.workerDaysService.updateWorkerDaysStatus(
      id,
      status,
      workerPeriods,
    );
  }

  @Patch('/:id')
  updateWorkerDay(
    @Param('id') id: string,
    @GetWorkerPeriods() workerPeriods: WorkerPeriods,
    @Body() updateWorkerkDaysDto: WorkerDaysDto,
  ): Promise<WorkerDays> {
    return this.workerDaysService.updateWorkerDay(
      id,
      updateWorkerkDaysDto,
      workerPeriods,
    );
  }
}
