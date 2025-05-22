import { AuthUser } from '../../../domain/entities/auth-user';

export class MeResponse {
  static format(authUser: AuthUser): any {
    return {
      id: authUser.userId,
      name: authUser.name,
      username: authUser.username,
      email: authUser.email,
    };
  }
}
