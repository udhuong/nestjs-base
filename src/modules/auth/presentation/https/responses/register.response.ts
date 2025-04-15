import { AuthUser } from '../../../domain/entities/auth-user';
import { isEmpty } from 'lodash';

export class RegisterResponse {
  static format(authUser: AuthUser): any {
    if (isEmpty(authUser)) {
      return null;
    }

    return {
      user_id: authUser.userId,
    };
  }
}
