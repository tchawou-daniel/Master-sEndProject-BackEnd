import { GetWorkerDayFilterDto } from '@api/workerDays/dto/get-worker-day-filter.dto';
import { UpdateWorkerDaysStatusDto } from '@api/workerDays/dto/update-workerDays-status.dto';
import { UpdateWorkerDaysDto } from '@api/workerDays/dto/update-workerDays.dto';
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

  // check the status of the user
  @Get()
  getWorkerDays(
    @Query() filterDto: GetWorkerDayFilterDto,
  ): Promise<WorkerDays[]> {
    this.logger.verbose(
      `Retrieve all worker days Filters: ${JSON.stringify(filterDto)}`,
    );
    return this.workerDaysService.getWorkerDays(filterDto);
  }

  // For a Period
  @Get('/period/:id')
  getWorkerDaysByPeriodId(
    @Query() filterDto: GetWorkerDayFilterDto,
  ): Promise<WorkerDays[]> {
    this.logger.verbose(
      `"For the worker period  retrieving all worker days Filters: ${JSON.stringify(
        filterDto,
      )}`,
    );
    return this.workerDaysService.getWorkerDays(filterDto);
  }

  @Get('/:id')
  getWorkerDayById(@Param('id') id: string): Promise<WorkerDays> {
    return this.workerDaysService.getWorkerDayById(id);
  }

  @Post()
  createWorkerPeriod(
    @Body() createWorkerDayDto: WorkerDaysDto,
  ): Promise<WorkerDays> {
    return this.workerDaysService.createWorkerDay(createWorkerDayDto);
  }

  @Delete('/:id')
  deleteWorkerDay(@Param('id') id: string): Promise<void> {
    return this.workerDaysService.deleteWorkerDay(id);
  }

  @Patch('/:id/status')
  updateWorkerDayStatus(
    @Param('id') id: string,
    @Body() updateWorkerkDayStatusDto: UpdateWorkerDaysStatusDto,
  ): Promise<WorkerDays> {
    const { workerDayStatus } = updateWorkerkDayStatusDto;
    return this.workerDaysService.updateWorkerDaysStatus(id, workerDayStatus);
  }

  @Patch('/:id')
  updateWorkerDay(
    @Param('id') id: string,
    @Body() updateWorkerkDayDto: UpdateWorkerDaysDto,
  ): Promise<WorkerDays> {
    return this.workerDaysService.updateWorkerDay(id, updateWorkerkDayDto);
  }
}
