import { Employment } from '@api/employment/employment.entity';
import { EmploymentDays } from '@api/employmentDays/employmentDays.entity';
import { BaseEntity } from '@api/SHARED/entities/base.entity';
import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { EmploymentPeriodStatus } from '../../common/types/EmploymentPeriods';

@Entity()
export class EmploymentPeriods extends BaseEntity {
  @Column({ default: null, nullable: true, type: 'int' })
  effectiveAsOf: number;

  @Column({ default: null, nullable: true, type: 'int' })
  effectiveUntil: number;

  @Column({
    type: 'enum',
    enum: EmploymentPeriodStatus,
    default: EmploymentPeriodStatus.AVAILABLE,
  })
  employmentPeriodStatus: EmploymentPeriodStatus;

  @Column()
  numberOfHours: number;

  @ManyToOne(
    (_type) => Employment,
    (employment) => employment.employmentPeriods,
    {
      eager: false,
    },
  )
  @Exclude({ toPlainOnly: true })
  employment: Employment;

  @OneToMany(
    (_type) => EmploymentDays,
    (employmentDays) => employmentDays.employmentPeriods,
    {
      eager: true,
    },
  )
  employmentDays: EmploymentDays[];
}
