import { Company } from '@api/company/company.entity';
import { Employment } from '@api/employment/employment.entity';
import { EmploymentDays } from '@api/employmentDays/employmentDays.entity';
import { BaseEntity } from '@api/SHARED/entities/base.entity';
import { UsersWorkForCompanies } from '@api/usersWorkForCompanies/usersWorkForCompanies.entity';
import { WorkerPeriods } from '@api/worker-periods/workerPeriods.entity';
import { Column, Entity, OneToMany } from 'typeorm';

import { UserRole, WorkerIntegrationStatus } from '../../common/types/user';

@Entity()
export class User extends BaseEntity {
  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.EMPLOYMENT_AGENCY,
  })
  role: UserRole;

  @Column({
    type: 'enum',
    enum: WorkerIntegrationStatus,
    default: WorkerIntegrationStatus.NO_STATUS,
  })
  workerIntegrationStatus: WorkerIntegrationStatus;

  @Column({ default: null })
  bio: string;

  @Column({ default: null })
  avatar: string;

  @Column({ type: 'timestamptz', default: null, nullable: true })
  clearedAt: Date;

  @Column({ type: 'timestamptz', default: null, nullable: true })
  joinedAt: Date;

  @Column({ type: 'timestamptz', default: null, nullable: true })
  lastConnection: Date;

  @Column({ default: null })
  salary: number;

  @OneToMany((_type) => Company, (company) => company.user, { eager: true })
  companies: Company[];

  @OneToMany(
    (_type) => EmploymentDays,
    (employmentDays) => employmentDays.user,
    { eager: true },
  )
  employmentDays: EmploymentDays[];

  @OneToMany((_type) => Employment, (employment) => employment.createdBy, {
    eager: true,
  })
  employments: Employment[];

  @OneToMany((_type) => WorkerPeriods, (workerPeriods) => workerPeriods.user, {
    eager: true,
  })
  workerPeriods: WorkerPeriods[];

  @OneToMany(
    () => UsersWorkForCompanies,
    (usersWorkForCompanies) => usersWorkForCompanies.user,
  )
  usersWorkForCompanies!: UsersWorkForCompanies[];
}
