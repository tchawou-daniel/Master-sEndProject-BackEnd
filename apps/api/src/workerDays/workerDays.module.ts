import { WorkerPeriodsModule } from '@api/worker-periods/workerPeriods.module';
import { WorkerDaysRepository } from '@api/workerDays/workerDays.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WorkerDaysController } from './workerDays.controller';
import { WorkerDaysService } from './workerDays.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkerDaysRepository]),
    WorkerPeriodsModule,
  ],
  controllers: [WorkerDaysController],
  providers: [WorkerDaysService],
})
export class WorkerDaysModule {}
