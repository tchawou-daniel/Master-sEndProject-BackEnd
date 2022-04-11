import { EmploymentPeriods } from '@api/employmentPeriods/employmentPeriods.entity';
import { createParamDecorator } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

export const GetEmploymentPeriods = createParamDecorator(
  (_data, ctx: ExecutionContextHost): EmploymentPeriods => {
    const req = ctx.switchToHttp().getRequest();
    return req.employmentPeriods;
  },
);
