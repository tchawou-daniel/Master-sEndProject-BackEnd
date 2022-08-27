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
import { Injectable, Logger } from '@nestjs/common';

import { UserRole } from '../../common/types/user';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Read_All_CreatedBy_SpecificUser = 'read_all_createdBySpecificUser',
  Read_All = 'read_all',
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

export type AppEntity =
  | User
  | Company
  | UsersWorkForCompanies
  | Employment
  | EmploymentPeriods
  | EmploymentDays
  | Worker
  | WorkerPeriods
  | WorkerDays;

export type AppAbility = Ability<[Action, Subjects]>;
@Injectable()
export class AbilityFactory {
  defineAbility(appEntity: AppEntity) {
    const { can, cannot, build } = new AbilityBuilder(
      Ability as AbilityClass<AppAbility>,
    );
    // Logger.log({ appEntity });
    switch ((appEntity as User).role) {
      case UserRole.ADMIN:
        can(Action.Manage, 'all');
        break;
      case UserRole.EMPLOYMENT_AGENCY:
        can(Action.Manage, User);
        cannot(Action.Manage, User, { role: { $ne: UserRole.ADMIN } }).because(
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
        cannot(Action.Manage, User).because("You don't have the rights");
        // company
        can([Action.Read], Company, {
          id: { $ne: (appEntity as UsersWorkForCompanies).companyId }, // compare id company to Id UsersWorkFor Companies after an evaluation
        });
        // cannot(Action.Delete, Company);
        // usersWorkForCompanies
        can([Action.Read], UsersWorkForCompanies, {
          userId: { $ne: (appEntity as User).id },
        });
        // cannot(Action.Delete, UsersWorkForCompanies);
        // Employment
        can(Action.Manage, Employment, {
          company: { $ne: appEntity as Company },
        });
        // cannot(Action.Delete, Employment);
        // EmploymentPeriods
        can(Action.Manage, EmploymentPeriods, {});
        // cannot(Action.Delete, EmploymentPeriods);
        // EmploymentDays
        can(Action.Manage, EmploymentDays);
        // Worker
        can(Action.Manage, Worker);
        // WorkerPeriods
        can(Action.Manage, WorkerPeriods);
        // WorkerDays
        can(Action.Manage, WorkerDays);
        break;
      case UserRole.PARTNER_COMPANY_EMPLOYEE_ADMIN:
        can(Action.Manage, User);

        // limit to one's own business
        can([Action.Read, Action.Delete, Action.Update], Company);
        // cannot(
        //   [Action.Read_All, Action.Read_All_CreatedBy_SpecificUser],
        //   Company,
        // );

        // limit to one's own business
        can(Action.Read, UsersWorkForCompanies);
        // cannot(
        //   [
        //     Action.Read_All,
        //     Action.Delete,
        //     Action.Update,
        //     Action.Create,
        //     Action.Read_All_CreatedBy_SpecificUser,
        //   ],
        //   UsersWorkForCompanies,
        // );

        // limit to one's own employment
        can(Action.Manage, Employment);

        can(Action.Read, EmploymentPeriods);
        can(Action.Read, EmploymentDays);

        // limit to one's own business
        cannot(Action.Manage, Worker);
        cannot(Action.Manage, WorkerPeriods);
        cannot(Action.Manage, WorkerDays);
        break;

      case UserRole.TEMPORARY_WORKER:
        can(Action.Read, Company);
        cannot(
          [Action.Read_All, Action.Read_All_CreatedBy_SpecificUser],
          Company,
        );
        can(Action.Read, User); // possibility to read user because we use two parameters when we call some functions

        // cannot(Action.Manage, UsersWorkForCompanies);
        // cannot(Action.Manage, Employment);
        // cannot(Action.Manage, EmploymentPeriods);
        // cannot(Action.Manage, EmploymentDays);
        // cannot(Action.Manage, Worker);
        // cannot(Action.Manage, WorkerPeriods);
        // cannot(Action.Manage, WorkerDays);
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
