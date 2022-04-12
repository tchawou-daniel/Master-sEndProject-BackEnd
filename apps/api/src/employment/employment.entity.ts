import { User } from '@api/auth/user.entity';
import { Company } from '@api/company/company.entity';
import { EmploymentPeriods } from '@api/employmentPeriods/employmentPeriods.entity';
import { Exclude } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { EmploymentSector, Hiring } from '../../common/types/employment';
import { BaseEntity } from '../SHARED/entities/base.entity';

@Entity()
export class Employment extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  country: string;

  @Column()
  town: string;

  @Column()
  street: string;

  @Column()
  zipCode: string;

  @Column({
    type: 'enum',
    enum: Hiring,
    default: Hiring.ONGOING,
  })
  hiringStatus: Hiring;

  @Column({ type: 'timestamp', default: null, nullable: true })
  clearedAt: Date;

  @Column({ type: 'timestamp', default: null, nullable: true })
  companyName: Date;

  @Column({ default: false })
  hasManySubsidiaries: boolean;

  @IsOptional()
  employementSector: EmploymentSector;

  @ManyToOne((_type) => Company, (company) => company.employments, {
    eager: false,
  })
  @Exclude({ toPlainOnly: true })
  company: Company;

  @OneToMany(
    (_type) => EmploymentPeriods,
    (employmentPeriods) => employmentPeriods.employment,
    { eager: true },
  )
  employmentPeriods: EmploymentPeriods[];

  @ManyToOne((_type) => User, (user) => user.employments, { eager: false })
  @Exclude({ toPlainOnly: true })
  createdBy: User;
}
