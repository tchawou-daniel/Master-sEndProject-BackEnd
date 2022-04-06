import { Module } from '@nestjs/common';
import { WorkerDaysController } from './workerDays.controller';
import { WorkerDaysService } from './workerDays.service';

@Module({
  controllers: [WorkerDaysController],
  providers: [WorkerDaysService]
})
export class WorkerDaysModule {}
