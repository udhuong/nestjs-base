import { TokenRepository } from '../../domain/contracts/token.repository.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccessTokenEntity } from '../entities/access-token.entity';
import { Repository } from 'typeorm';
import { RefreshTokenEntity } from '../entities/refresh-token.entity';
import { AccessToken } from '../../domain/entities/access-token';
import { isEmpty } from 'lodash';
import { RefreshToken } from '../../domain/entities/refresh-token';

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
  async createAccessToken(token: AccessToken, userId: number): Promise<void> {
    const entity = new AccessTokenEntity();
    entity.id = token.id;
    entity.userId = userId;
    entity.expiresAt = token.expiryDate;
    entity.created = new Date();
    await this.accessTokenRepository.save(entity);
  }

  /**
   * Tạo refresh token
   *
   * @param token
   * @param accessTokenId
   */
  async createRefreshToken(token: AccessToken, accessTokenId: string): Promise<void> {
    const entity = new RefreshTokenEntity();
    entity.id = token.id;
    entity.accessTokenId = accessTokenId;
    entity.expiresAt = token.expiryDate;
    await this.refreshTokenRepository.save(entity);
  }

  /**
   * Tìm refresh token
   *
   * @param refreshToken
   */
  async findRefreshToken(refreshToken: string): Promise<RefreshToken> {
    const entity = await this.refreshTokenRepository.findOne({
      where: {
        id: refreshToken,
      },
    });
    if (isEmpty(entity)) {
      return null;
    }

    const token = new RefreshToken();
    token.id = entity.id;
    token.accessTokenId = entity.accessTokenId;
    token.expiryDate = entity.expiresAt;
    token.revoked = entity.revoked;

    return token;
  }

  /**
   * Vô hiệu hóa access token
   *
   * @param token
   */
  async revokeAccessToken(token: string): Promise<void> {
    const entity = await this.accessTokenRepository.findOne({
      where: {
        id: token,
        revoked: false,
      },
    });
    if (isEmpty(entity)) {
      return null;
    }

    await this.accessTokenRepository.update(
      {
        id: token,
      },
      {
        revoked: true,
      },
    );
  }

  /**
   * Vô hiệu hóa refresh token
   *
   * @param token
   */
  async revokeRefreshToken(token: string): Promise<void> {
    const entity = await this.refreshTokenRepository.findOne({
      where: {
        id: token,
        revoked: false,
      },
    });
    if (isEmpty(entity)) {
      return null;
    }

    await this.refreshTokenRepository.update(
      {
        id: token,
      },
      {
        revoked: true,
      },
    );
  }
}
