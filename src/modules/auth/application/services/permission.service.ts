import { Injectable } from '@nestjs/common';
import { loadPermissions } from '../../../../shared/yaml-loader';
import { AuthUser } from '../../domain/entities/auth-user';

@Injectable()
export class PermissionService {
  private config: any;

  constructor() {
    this.config = loadPermissions();
  }

  /**
   * Kiểm tra xem phương thức và đường dẫn có nằm trong danh sách trắng hay không
   *
   * @param method
   * @param path
   * @param username
   */
  isWhitelisted(method: string, path: string, username: string): boolean {
    const uri = `${method.toUpperCase()} ${path}`;
    return this.config.whitelist?.uri?.includes(uri) || this.config.whitelist?.usernames?.includes(username);
  }

  handle(method: string, path: string, user: AuthUser): boolean {
    // Có dạng /api/auth/me
    const uri = `${method.toUpperCase()} ${path}`;
    const rule = this.config.routes?.[uri];

    // Không có không cho ai truy cập
    if (!rule) {
      return false;
    }

    // Check username
    if (rule.usernames && this.checkUsername(rule, user)) {
      return true;
    }

    // Check role
    if (rule.roles && this.checkRole(rule, user)) {
      return true;
    }

    // Check permission
    if (rule.permissions && this.checkPermission(rule, user)) {
      return true;
    }

    // Không có quyền
    return false;
  }

  private checkUsername(rule: any, user: AuthUser): boolean {
    return rule.usernames.includes(user.username);
  }

  private checkRole(rule: any, user: AuthUser): boolean {
    return rule.roles.some(r => user.roles.includes(r));
  }

  private checkPermission(rule: any, user: AuthUser): boolean {
    return rule.permissions.some(p => user.permissions.includes(p));
  }
}
