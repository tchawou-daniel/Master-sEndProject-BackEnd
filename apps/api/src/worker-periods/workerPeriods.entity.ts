import { BaseEntity } from '../SHARED/entities/base.entity';
import { Column, ManyToOne } from 'typeorm';
import { PeriodStatus } from '../../common/types/workerPeriods';
import { User } from '@api/auth/user.entity';
import { Exclude } from 'class-transformer';

export class WorkerPeriods extends BaseEntity {

  @Column({ default: null, nullable: true, type: 'int' })
  effectiveAsOf: number;

  @Column({ default: null, nullable: true, type: 'int' })
  effectiveUntil: number;

  @Column({
    type: 'enum',
    enum: PeriodStatus,
    default: PeriodStatus.AVAILABLE
  })
    periodStatus: PeriodStatus;

  @Column()
  numberOfHours: number;

  @ManyToOne(_type => User, user => user.employment, { eager: false })
  @Exclude({ toPlainOnly: true })
  user : User;
}
