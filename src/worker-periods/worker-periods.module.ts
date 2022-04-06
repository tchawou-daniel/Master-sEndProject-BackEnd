import { Module } from '@nestjs/common';
import { WorkerPeriodsController } from './worker-periods.controller';

@Module({
  controllers: [WorkerPeriodsController]
})
export class WorkerPeriodsModule {}
