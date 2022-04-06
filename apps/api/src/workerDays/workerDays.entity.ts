import { BaseEntity } from '@api/SHARED/entities/base.entity';
import { WeekDays } from '../../common/types/workerDays';
import { WorkerPeriods } from '@api/worker-periods/workerPeriods.entity';
import { Column, IsNull, ManyToOne } from 'typeorm';
import { Exclude } from 'class-transformer';

export class WorkerDays extends BaseEntity {
  @Column({ type: 'int', nullable: false })
  startTime: number;

  @Column({ type: 'int', nullable: false })
  endTime: number;

  @Column({ type: 'int', nullable: false })
  nbHours: number;

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
