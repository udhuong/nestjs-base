import { AccessToken } from '../entities/access-token';
import { RefreshToken } from '../entities/refresh-token';

export interface TokenRepository {
  createAccessToken(token: AccessToken, userId: number): Promise<void>;
  createRefreshToken(token: AccessToken, accessTokenId: string): Promise<void>;
  findAccessToken(tokenId: string): Promise<AccessToken>;
  findRefreshToken(tokenId: string): Promise<RefreshToken>;
  revokeAccessToken(token: string): Promise<void>;
  revokeRefreshToken(token: string): Promise<void>;
  revokeRefreshTokenFromAccessToken(accessToken: string): Promise<void>;
}
