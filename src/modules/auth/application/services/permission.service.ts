import { Injectable } from '@nestjs/common';
import { loadPermissions } from '../../../../shared/yaml-loader';

@Injectable()
export class PermissionService {
  getRolesForRoute(method: string, path: string): string[] {
    // const controller = this.extractController(path); // ví dụ: /users
    const routeKey = `${method.toUpperCase()} ${path}`;
    return loadPermissions?.['routes']?.[routeKey] ?? [];
  }

  private extractController(path: string): string {
    const segments = path.split('/');
    return segments[1];
  }
}
