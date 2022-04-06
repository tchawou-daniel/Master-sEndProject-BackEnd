import { BaseEntity } from '../SHARED/entities/base.entity';
import { Column, ManyToOne, OneToMany } from 'typeorm';
import { WorkerPeriodStatus } from '../../common/types/workerPeriods';
import { User } from '@api/auth/user.entity';
import { Exclude } from 'class-transformer';
import { WorkerDays } from '@api/workerDays/workerDays.entity';

export class WorkerPeriods extends BaseEntity {

  @Column({ default: null, nullable: true, type: 'int' })
  effectiveAsOf: number;

  @Column({ default: null, nullable: true, type: 'int' })
  effectiveUntil: number;

  @Column({
    type: 'enum',
    enum: WorkerPeriodStatus,
    default: WorkerPeriodStatus.AVAILABLE
  })
  workerPeriodStatus: WorkerPeriodStatus;

  @Column()
  numberOfHours: number;

  @ManyToOne(_type => User, user => user.workerPeriods, { eager: false })
  @Exclude({ toPlainOnly: true })
  user : User;

  // bind with workerPeriods entity
  @OneToMany((_type) => WorkerDays, (workerDays) => workerDays.workerPeriods, { eager: true })
  workerDays: WorkerDays[];
}
