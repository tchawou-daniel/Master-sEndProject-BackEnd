import { Module } from '@nestjs/common';
import { WorkerPeriodsController } from './worker-periods.controller';
import { WorkerPeriodsService } from './worker-periods.service';

@Module({
  controllers: [WorkerPeriodsController],
  providers: [WorkerPeriodsService]
})
export class WorkerPeriodsModule {}
