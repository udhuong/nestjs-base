import { Role } from '../entities/role';

export interface PermissionRepository {
  getAllRoleByGuard(guard: string): Promise<Map<number, Role>>;
  getAllRoleByGuardV2(guard: string): Promise<Map<number, Role>>;
  getAllRoleByGuardV3(guard: string): Promise<Map<number, Role>>;
}
