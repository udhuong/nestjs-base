import { isEmpty } from 'lodash';
import { Token } from '../../../domain/entities/token';

export class LoginResponse {
  static format(token: Token): any {
    if (isEmpty(token)) {
      return null;
    }

    return {
      expires_in: token.accessExpiresIn,
      access_token: token.accessToken,
      refresh_token: token.refreshToken,
    };
  }
}
