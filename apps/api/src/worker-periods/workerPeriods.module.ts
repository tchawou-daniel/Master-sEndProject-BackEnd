import { Module } from '@nestjs/common';
import { WorkerPeriodsController } from './workerPeriods.controller';
import { WorkerPeriodsService } from './workerPeriods.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@api/auth/auth.module';
import { WorkerPeriodsRepository } from '@api/worker-periods/workerPeriods.repository';

@Module({
  imports: [TypeOrmModule.forFeature([WorkerPeriodsRepository]), AuthModule],
  controllers: [WorkerPeriodsController],
  providers: [WorkerPeriodsService]
})
export class WorkerPeriodsModule {}
