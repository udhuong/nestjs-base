import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AccessToken = createParamDecorator((data: unknown, ctx: ExecutionContext): string | undefined => {
  const request = ctx.switchToHttp().getRequest();
  const authHeader = request.headers['authorization'];
  return authHeader?.split(' ')[1]; // lấy ra token
});
