import { WorkerDays } from '@api/workerDays/workerDays.entity';
import { createParamDecorator } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

export const GetEmployment = createParamDecorator(
  (_data, ctx: ExecutionContextHost): WorkerDays => {
    const req = ctx.switchToHttp().getRequest();
    return req.employment;
  },
);
