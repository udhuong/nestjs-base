export class AuthUser {
  userId: number;
  name: string;
  email: string;
  password: string;
  passwordRaw: string;
  roles: string[];
  permissions: string[];
}
