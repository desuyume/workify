import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { IUserPayload } from '@workify/shared'

export const CurrentUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): IUserPayload => {
    const request = ctx.switchToHttp().getRequest()
    return request.user
  }
)
