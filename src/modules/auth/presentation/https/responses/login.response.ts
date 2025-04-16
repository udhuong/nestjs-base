import { AccessToken } from '../../../domain/entities/access-token';

export class LoginResponse {
  static format(accessToken: AccessToken, refreshToken: AccessToken): any {
    return {
      token_type: 'Bearer',
      expires_in: accessToken.expiryIn,
      access_token: accessToken.id,
      refresh_token: refreshToken.id,
    };
  }
}
