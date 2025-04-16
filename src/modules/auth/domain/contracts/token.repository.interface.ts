import { Token } from '../entities/token';

export interface TokenRepository {
  createAccessToken(token: Token, userId: number): Promise<void>;
  createRefreshToken(token: Token): Promise<void>;
}
