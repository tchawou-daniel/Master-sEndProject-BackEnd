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

export type Subjects =
  | InferSubjects<
      | typeof User
      | typeof Company
      | typeof UsersWorkForCompanies
      | typeof Employment
      | typeof EmploymentPeriods
      | typeof EmploymentDays
      | typeof Worker
      | typeof WorkerPeriods
      | typeof WorkerDays
    >
  | 'all';

export type AppAbility = Ability<[Action, Subjects]>;
@Injectable()
export class AbilityFactory {
  defineAbility(user: User) {
    const { can, cannot, build } = new AbilityBuilder(
      Ability as AbilityClass<AppAbility>,
    );
    switch (user.role) {
      case UserRole.ADMIN:
        can(Action.Manage, 'all');
        break;
      case UserRole.EMPLOYMENT_AGENCY:
        can(Action.Manage, User);
        cannot(Action.Manage, User, { role: { $ne: user.role } }).because(
          "You don't have the rights",
        );
        can(Action.Manage, Company);
        can(Action.Manage, UsersWorkForCompanies);
        can(Action.Manage, Employment);
        can(Action.Manage, EmploymentPeriods);
        can(Action.Manage, EmploymentDays);
        can(Action.Manage, Worker);
        can(Action.Manage, WorkerPeriods);
        can(Action.Manage, WorkerDays);
        break;
      case UserRole.PARTNER_COMPANY_EMPLOYEE:
        break;
      case UserRole.PARTNER_COMPANY_EMPLOYEE_ADMIN:
        break;
      case UserRole.TEMPORARY_WORKER:
        can(Action.Manage, User);
        cannot(Action.Manage, User, { role: { $ne: user.role } }).because(
          "You don't have the rights",
        );
        cannot(Action.Create, Company);
        cannot(Action.Manage, UsersWorkForCompanies);
        cannot(Action.Manage, Employment);
        cannot(Action.Manage, EmploymentPeriods);
        cannot(Action.Manage, EmploymentDays);
        cannot(Action.Manage, Worker);
        cannot(Action.Manage, WorkerPeriods);
        cannot(Action.Manage, WorkerDays);
        break;
      case UserRole.PERMANENT_WORKER:
        break;
    }

    return build({
      detectSubjectType: (subject) =>
        subject.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
