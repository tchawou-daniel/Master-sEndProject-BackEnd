import { EmploymentPeriods } from '@api/employmentPeriods/employmentPeriods.entity';
import { Exclude } from 'class-transformer';
import { BaseEntity, Column, Entity, ManyToOne } from 'typeorm';

import {
  EmploymentDayStatus,
  WeekDays,
} from '../../common/types/employmentDays';

@Entity()
export class EmploymentDays extends BaseEntity {
  @Column({ type: 'int', nullable: false })
  startTime: number;

  @Column({ type: 'int', nullable: false })
  endTime: number;

  @Column({ type: 'int', nullable: false })
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

  @ManyToOne(
    (_type) => EmploymentPeriods,
    (employmentPeriod) => employmentPeriod.employmentDays,
    { eager: false },
  )
  @Exclude({ toPlainOnly: true })
  employmentPeriods: EmploymentPeriods;
}
