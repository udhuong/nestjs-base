import { Role } from '../entities/role';

export interface PermissionRepository {
  getAllRoleByGuard(guard: string): Promise<Map<number, Role>>;
}
