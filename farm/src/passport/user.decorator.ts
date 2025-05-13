import { createParamDecorator, ExecutionContext } from "@nestjs/common";

// tao ra 1 decorator de lay user tu request
// decorator nay la lay 1 tai nguyen trong request
export const User = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});

