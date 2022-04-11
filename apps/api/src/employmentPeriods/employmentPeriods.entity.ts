import { EmploymentDays } from '@api/employmentDays/employmentDays.entity';
import { BaseEntity } from '@api/SHARED/entities/base.entity';
import { OneToMany } from 'typeorm';

export class EmploymentPeriods extends BaseEntity {
  // bind with workerPeriods entity
  @OneToMany(
    (_type) => EmploymentDays,
    (employmentDays) => employmentDays.employmentPeriods,
    {
      eager: true,
    },
  )
  employmentDays: EmploymentDays[];
}
