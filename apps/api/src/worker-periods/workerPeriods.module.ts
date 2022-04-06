import { Module } from '@nestjs/common';
import { WorkerPeriodsController } from './workerPeriods.controller';
import { WorkerPeriodsService } from './workerPeriods.service';

@Module({
  controllers: [WorkerPeriodsController],
  providers: [WorkerPeriodsService]
})
export class WorkerPeriodsModule {}
