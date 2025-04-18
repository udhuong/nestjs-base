import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import { TokenService } from '../../application/services/token.service';
import { IS_PUBLIC_KEY } from '../decorators/api-public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
    private readonly tokenService: TokenService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    //  getAllAndOverride: Ưu tiên metadata từ method, nếu không có thì lấy từ class
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(), // method
      context.getClass(), // controller
    ]);
    if (isPublic) return true;

    const canActivate = (await super.canActivate(context)) as boolean;

    // Trích xuất token từ header
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token chưa được cung cấp.');
    }
    const token = authHeader.replace('Bearer ', '');
    if (await this.tokenService.isRevokedAccessToken(token)) {
      throw new UnauthorizedException('Token đã bị thu hồi.');
    }

    return canActivate;
  }
}
