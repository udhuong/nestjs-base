import { Permission } from './permission';
import { Role } from './role';

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
