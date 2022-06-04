import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetRawJwt = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.headers.authorization.replace('Bearer ', '');
});
