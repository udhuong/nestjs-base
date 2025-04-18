import { Role } from '../value-objects/role.enum';
import { Permission } from '../value-objects/permission.enum';

export class AuthUser {
  userId: number;
  name: string;
  username: string;
  email: string;
  password: string;
  passwordRaw: string;
  roles: Role[] = [];
  permissions: Permission[] = [];
}
