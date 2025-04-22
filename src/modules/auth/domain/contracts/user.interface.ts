import { AuthUser } from '../entities/auth-user';

export interface UserRepository {
  findByEmail(email: string): Promise<AuthUser | null>;
  findById(id: number): Promise<AuthUser | null>;
  findByIdWithRolePermission(id: number): Promise<AuthUser | null>;
  save(user: AuthUser): Promise<number>;
}
