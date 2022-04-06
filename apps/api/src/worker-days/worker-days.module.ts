import { Module } from '@nestjs/common';
import { WorkerDaysController } from './worker-days.controller';
import { WorkerDaysService } from './worker-days.service';

@Module({
  controllers: [WorkerDaysController],
  providers: [WorkerDaysService]
})
export class WorkerDaysModule {}
