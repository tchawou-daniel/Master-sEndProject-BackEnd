import { WorkerPeriods } from '@api/worker-periods/workerPeriods.entity';
import { createParamDecorator } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

export const GetWorkerPeriods = createParamDecorator(
  (_data, ctx: ExecutionContextHost): WorkerPeriods => {
    const req = ctx.switchToHttp().getRequest();
    return req.workerPeriods;
  },
);
