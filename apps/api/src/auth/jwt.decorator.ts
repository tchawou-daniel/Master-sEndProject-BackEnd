import { createParamDecorator, ExecutionContext, Logger } from '@nestjs/common';

export const GetRawJwt = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const logger = new Logger('AuthController');
    const request = ctx.switchToHttp().getRequest();
    logger.verbose(request.headers.authorization);
    return request.headers.authorization.replace('Bearer ', '');
  },
);
