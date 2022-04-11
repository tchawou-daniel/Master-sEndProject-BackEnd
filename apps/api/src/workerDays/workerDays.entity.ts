import { BaseEntity } from '@api/SHARED/entities/base.entity';
import { WorkerPeriods } from '@api/worker-periods/workerPeriods.entity';
import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToOne } from 'typeorm';

import { WeekDays, WorkerDayStatus } from '../../common/types/workerDays';

@Entity()
export class WorkerDays extends BaseEntity {
  @Column({ type: 'int', nullable: false })
  startTime: number;

  @Column({ type: 'int', nullable: false })
  endTime: number;

  @Column({ type: 'int', nullable: false })
  numberOfHours: number;

  @Column({
    type: 'enum',
    enum: WorkerDayStatus,
    default: WorkerDayStatus.AVAILABLE,
  })
  workerDayStatus: WorkerDayStatus;

  @Column({
    type: 'enum',
    enum: WeekDays,
  })
  weekday: WeekDays;

  @ManyToOne(
    (_type) => WorkerPeriods,
    (workerPeriods) => workerPeriods.workerDays,
    { eager: false },
  )
  @Exclude({ toPlainOnly: true })
  workerPeriods: WorkerPeriods;
}
