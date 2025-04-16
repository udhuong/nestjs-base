import { TokenRepository } from '../../domain/contracts/token.repository.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccessTokenEntity } from '../entities/access-token.entity';
import { Repository } from 'typeorm';
import { RefreshTokenEntity } from '../entities/refresh-token.entity';
import { Token } from '../../domain/entities/token';

@Injectable()
export class TokenRepositoryImpl implements TokenRepository {
  constructor(
    @InjectRepository(AccessTokenEntity)
    private readonly accessTokenRepository: Repository<AccessTokenEntity>,
    @InjectRepository(RefreshTokenEntity)
    private readonly refreshTokenRepository: Repository<RefreshTokenEntity>,
  ) {}

  /**
   * Tạo access token
   *
   * @param token
   * @param userId
   */
  async createAccessToken(token: Token, userId: number): Promise<void> {
    const entity = new AccessTokenEntity();
    entity.id = token.accessToken;
    entity.userId = userId;
    entity.expiresAt = token.accessExpiresIn;
    entity.created = new Date();
    await this.accessTokenRepository.save(entity);
  }

  /**
   * Tạo refresh token
   *
   * @param token
   */
  async createRefreshToken(token: Token): Promise<void> {
    const entity = new RefreshTokenEntity();
    entity.id = token.refreshToken;
    entity.accessTokenId = token.accessToken;
    entity.expiresAt = token.refreshExpiresIn;
    await this.refreshTokenRepository.save(entity);
  }
}
