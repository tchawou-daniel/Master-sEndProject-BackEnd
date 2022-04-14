import { User } from '@api/auth/user.entity';
import { WorkerDays } from '@api/workerDays/workerDays.entity';
import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { WorkerPeriodStatus } from '../../common/types/workerPeriods';
import { BaseEntity } from '../SHARED/entities/base.entity';

@Entity()
export class WorkerPeriods extends BaseEntity {
  @Column({ default: null, nullable: true, type: 'int' })
  effectiveAsOf: number;

  @Column({ default: null, nullable: true, type: 'int' })
  effectiveUntil: number;

  @Column({
    type: 'enum',
    enum: WorkerPeriodStatus,
    default: WorkerPeriodStatus.AVAILABLE,
  })
  workerPeriodStatus?: WorkerPeriodStatus;

  @Column({ type: 'int' })
  numberOfHours: number;

  @ManyToOne((_type) => User, (user) => user.workerPeriods, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;

  // bind with workerPeriods entity
  @OneToMany((_type) => WorkerDays, (workerDays) => workerDays.workerPeriods, {
    eager: true,
  })
  workerDays: WorkerDays[];
}
