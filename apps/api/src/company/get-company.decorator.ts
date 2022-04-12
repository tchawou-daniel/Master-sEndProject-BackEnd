import { Company } from '@api/company/company.entity';
import { createParamDecorator } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

export const GetCompany = createParamDecorator(
  (_data, ctx: ExecutionContextHost): Company => {
    const req = ctx.switchToHttp().getRequest();
    return req.company;
  },
);
