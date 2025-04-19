import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { PermissionService } from '../../application/services/permission.service';
import { PermissionRepository } from '../../domain/contracts/permission.interface';
import { IS_PUBLIC_KEY } from '../decorators/api-public.decorator';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly permissionService: PermissionService,
    private readonly permissionRepository: PermissionRepository,
  ) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(), // method
      context.getClass(), // controller
    ]);
    if (isPublic) return true;
    const roles = this.permissionRepository.getAllRoleByGuardV3('api');
    if (!roles) return false;
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const method = request.method;
    const path = request.route.path;
    if (this.permissionService.isWhitelisted(method, path, user?.username)) {
      return true;
    }

    if (!user) throw new UnauthorizedException();

    const isAllowed = this.permissionService.handle(method, path, user);

    if (!isAllowed) {
      throw new ForbiddenException('Không có quyền truy cập');
    }

    return true;
  }
}
