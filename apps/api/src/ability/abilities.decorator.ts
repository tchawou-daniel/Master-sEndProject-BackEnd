import { User } from '@api/auth/user.entity';
import { SetMetadata } from '@nestjs/common';

import {
  Action,
  EmploymentDaysSubject,
  EmploymentPeriodsSubject,
  EmploymentSubject,
  UserSubject,
  UsersWorkForCompaniesSubject,
  WorkerDaysSubject,
  WorkerPeriodsSubject,
  WorkerSubject,
} from './ability.factory';

export interface RequiredRule {
  action: Action;
  subject:
    | UserSubject
    | EmploymentSubject
    | EmploymentPeriodsSubject
    | EmploymentDaysSubject
    | UsersWorkForCompaniesSubject
    | WorkerSubject
    | WorkerPeriodsSubject
    | WorkerDaysSubject;
}

export const CHECK_ABILITY = 'check_ability';

export const CheckAbilities = (...requirements: RequiredRule[]) =>
  SetMetadata(CHECK_ABILITY, requirements);

export class ReadUserAbility implements RequiredRule {
  action = Action.Read;

  subject = User;
}
