import { Worker } from 'worker_threads';

import { User } from '@api/auth/user.entity';
import { Company } from '@api/company/company.entity';
import { Employment } from '@api/employment/employment.entity';
import { EmploymentDays } from '@api/employmentDays/employmentDays.entity';
import { EmploymentPeriods } from '@api/employmentPeriods/employmentPeriods.entity';
import { UsersWorkForCompanies } from '@api/usersWorkForCompanies/usersWorkForCompanies.entity';
import { WorkerPeriods } from '@api/worker-periods/workerPeriods.entity';
import { WorkerDays } from '@api/workerDays/workerDays.entity';
import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { isEqual } from 'lodash';

import { UserRole } from '../../common/types/user';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export type UserSubject = InferSubjects<typeof User> | 'allUsers';

export type CompanySubject = InferSubjects<typeof Company> | 'allCompany';

export type EmploymentSubject =
  | InferSubjects<typeof Employment>
  | 'allEmployment';

export type EmploymentPeriodsSubject =
  | InferSubjects<typeof EmploymentPeriods>
  | 'allEmploymentPeriods';

export type EmploymentDaysSubject =
  | InferSubjects<typeof EmploymentDays>
  | 'allEmploymentDays';

export type UsersWorkForCompaniesSubject =
  | InferSubjects<typeof UsersWorkForCompanies>
  | 'allUsersWorkForCompanies';

export type WorkerSubject = InferSubjects<typeof Worker> | 'allWorker';

export type WorkerPeriodsSubject =
  | InferSubjects<typeof WorkerPeriods>
  | 'allWorkerPeriods';

export type WorkerDaysSubject =
  | InferSubjects<typeof WorkerDays>
  | 'allWorkerDays';

export type Subjects =
  | UserSubject
  | CompanySubject
  | EmploymentSubject
  | EmploymentPeriodsSubject
  | EmploymentDaysSubject
  | UsersWorkForCompaniesSubject
  | WorkerSubject
  | WorkerPeriodsSubject
  | WorkerDaysSubject;
// export type EntityType =
//   | User
//   | Company
//   | Employment
//   | EmploymentPeriods
//   | EmploymentDays
//   | UsersWorkForCompanies
//   | Worker
//   | WorkerPeriods
//   | WorkerDays;

// const isUserEntity = (obj: EntityType): obj is User => obj !== undefined;
// const isCompanyEntity = (obj: EntityType): obj is Company => obj !== undefined;
// const isEmploymentEntity = (obj: EntityType): obj is Employment =>
//   obj !== undefined;
// const isEmploymentPeriodsEntity = (obj: EntityType): obj is EmploymentPeriods =>
//   obj !== undefined;
// const isEmploymentDaysEntity = (obj: EntityType): obj is EmploymentDays =>
//   obj !== undefined;
// const isUsersWorkForCompaniesEntity = (
//   obj: EntityType,
// ): obj is UsersWorkForCompanies => obj !== undefined;
// const isWorkerEntity = (obj: EntityType): obj is Worker => obj !== undefined;
// const isWorkerPeriodsEntity = (obj: EntityType): obj is WorkerPeriods =>
//   obj !== undefined;
// const isWorkerDaysEntity = (obj: EntityType): obj is WorkerDays =>
//   obj !== undefined;

export type AppAbility = Ability<[Action, Subjects]>;
@Injectable()
export class AbilityFactory {
  defineAbility(user: User) {
    const { can, cannot, build } = new AbilityBuilder(
      Ability as AbilityClass<AppAbility>,
    );
    switch (user.role) {
      case UserRole.ADMIN:
        can(Action.Manage, 'allUsers');
        can(Action.Manage, 'allCompany');
        can(Action.Manage, 'allUsersWorkForCompanies');
        can(Action.Manage, 'allEmployment');
        can(Action.Manage, 'allEmploymentPeriods');
        can(Action.Manage, 'allEmploymentDays');
        can(Action.Manage, 'allWorker');
        can(Action.Manage, 'allWorkerPeriods');
        can(Action.Manage, 'allWorkerDays');
        break;
      case UserRole.EMPLOYMENT_AGENCY:
        can(Action.Manage, 'allUsers');
        cannot(Action.Delete, User, { id: { $ne: user.id } }).because(
          "You don't have the rights ",
        );
        break;
      case UserRole.PARTNER_COMPANY_EMPLOYEE:
        break;
      case UserRole.PARTNER_COMPANY_EMPLOYEE_ADMIN:
        break;
      case UserRole.TEMPORARY_WORKER:
        break;
      case UserRole.PERMANENT_WORKER:
        break;
    }

    return build({
      detectSubjectType: (subject) =>
        subject.constructor as ExtractSubjectType<UserSubject>,
    });
  }
}
