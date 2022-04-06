import { Module } from '@nestjs/common';
import { WorkerDaysController } from './workerDays.controller';
import { WorkerDaysService } from './workerDays.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkerDays } from '@api/workerDays/workerDays.entity';
import { AuthModule } from '@api/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([WorkerDays]), AuthModule],
  controllers: [WorkerDaysController],
  providers: [WorkerDaysService],
})
export class WorkerDaysModule {}
