import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmpty } from 'lodash';
import { Repository } from 'typeorm';

import { TokenRepository } from '../../../domain/contracts/token.interface';
import { AccessToken } from '../../../domain/entities/access-token';
import { RefreshToken } from '../../../domain/entities/refresh-token';
import { AccessTokenEntity } from '../entities/access-token.entity';
import { RefreshTokenEntity } from '../entities/refresh-token.entity';

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
   * Tìm access token
   *
   * @param tokenId
   */
  async findAccessToken(tokenId: string): Promise<AccessToken> {
    const entity = await this.accessTokenRepository.findOne({
      where: {
        id: tokenId,
      },
    });
    if (isEmpty(entity)) {
      return null;
    }

    const token = new AccessToken();
    token.id = entity.id;
    token.expiryDate = entity.expiresAt;
    token.revoked = entity.revoked;
    return token;
  }

  /**
   * Tìm refresh token
   *
   * @param tokenId
   */
  async findRefreshToken(tokenId: string): Promise<RefreshToken> {
    const entity = await this.refreshTokenRepository.findOne({
      where: {
        id: tokenId,
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

  /**
   * Vô hiệu hóa refresh token từ access token
   *
   * @param accessToken
   */
  async revokeRefreshTokenFromAccessToken(accessToken: string): Promise<void> {
    const entity = await this.refreshTokenRepository.findOne({
      where: {
        accessTokenId: accessToken,
        revoked: false,
      },
    });
    if (isEmpty(entity)) {
      return null;
    }

    await this.refreshTokenRepository.update(
      {
        id: entity.id,
      },
      {
        revoked: true,
      },
    );
  }
}
