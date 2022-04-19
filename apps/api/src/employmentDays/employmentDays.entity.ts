import { User } from '@api/auth/user.entity';
import { EmploymentPeriods } from '@api/employmentPeriods/employmentPeriods.entity';
import { BaseEntity } from '@api/SHARED/entities/base.entity';
import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToOne } from 'typeorm';

import {
  EmploymentDayStatus,
  WeekDays,
} from '../../common/types/employmentDays';
import { WorkerDayStatus } from '../../common/types/workerDays';

@Entity()
export class EmploymentDays extends BaseEntity {
  @Column({ type: 'time', nullable: false })
  startTime: number;

  @Column({ type: 'time', nullable: false })
  endTime: number;

  @Column({ type: 'float', nullable: false })
  numberOfHours: number;

  @Column({
    type: 'enum',
    enum: EmploymentDayStatus,
    default: EmploymentDayStatus.AVAILABLE,
  })
  employmentDayStatus: EmploymentDayStatus;

  @Column({
    type: 'enum',
    enum: WeekDays,
  })
  weekday: WeekDays;

  @ManyToOne((_type) => User, (user) => user.companies, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;

  @ManyToOne(
    (_type) => EmploymentPeriods,
    (employmentPeriod) => employmentPeriod.employmentDays,
    { eager: false },
  )
  @Exclude({ toPlainOnly: true })
  employmentPeriods: EmploymentPeriods;
}
