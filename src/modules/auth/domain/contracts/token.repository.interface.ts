import { AccessToken } from '../entities/access-token';
import { RefreshToken } from '../entities/refresh-token';

export interface TokenRepository {
  createAccessToken(token: AccessToken, userId: number): Promise<void>;
  createRefreshToken(token: AccessToken, accessTokenId: string): Promise<void>;
  findRefreshToken(refreshToken: string): Promise<RefreshToken>;
  revokeAccessToken(token: string): Promise<void>;
  revokeRefreshToken(token: string): Promise<void>;
}
