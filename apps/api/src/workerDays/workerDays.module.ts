import { WorkerPeriods } from '@api/worker-periods/workerPeriods.entity';
import { WorkerDaysRepository } from '@api/workerDays/workerDays.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WorkerDaysController } from './workerDays.controller';
import { WorkerDaysService } from './workerDays.service';

@Module({
  imports: [TypeOrmModule.forFeature([WorkerDaysRepository]), WorkerPeriods],
  controllers: [WorkerDaysController],
  providers: [WorkerDaysService],
})
export class WorkerDaysModule {}
