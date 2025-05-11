import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { isEmpty } from 'lodash';
import { TokenRepository } from 'src/modules/auth/domain/contracts/token.interface';
import { AccessToken } from 'src/modules/auth/domain/entities/access-token';
import { AuthUser } from 'src/modules/auth/domain/entities/auth-user';
import { RefreshToken } from 'src/modules/auth/domain/entities/refresh-token';
import { REPOSITORY } from 'src/modules/auth/type';
import { AppException } from 'src/shared/exceptions/app-exception';

@Injectable()
export class TokenService {
  constructor(
    @Inject(REPOSITORY.TokenRepository)
    private readonly tokenRepository: TokenRepository,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Tạo access token
   * @param user
   */
  async createAccessToken(user: AuthUser): Promise<AccessToken> {
    if (isEmpty(user)) {
      throw new AppException('User không tồn tại');
    }
    const payload = { sub: user.userId }; // Dữ liệu bạn muốn gắn vào token

    const token = new AccessToken();
    const expiry = Number(this.configService.get<string>('jwt.access.expiry'));

    token.id = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('jwt.access.secret'),
      expiresIn: expiry,
    });
    token.expiryDate = new Date(Date.now() + expiry * 1000);
    token.expiryIn = expiry;

    await this.tokenRepository.createAccessToken(token, user.userId);

    return token;
  }

  /**
   * Tạo refresh token
   * @param user
   * @param accessTokenId
   */
  async createRefreshToken(user: AuthUser, accessTokenId: string): Promise<RefreshToken> {
    const payload = { sub: user.userId };

    const token = new RefreshToken();
    const expiry = Number(this.configService.get<string>('jwt.refresh.expiry'));

    token.id = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('jwt.refresh.secret'),
      expiresIn: expiry,
    });
    token.accessTokenId = accessTokenId;
    token.expiryDate = new Date(Date.now() + expiry * 1000);
    token.expiryIn = expiry;

    await this.tokenRepository.createRefreshToken(token, accessTokenId);

    return token;
  }

  // Xác thực access token
  async verifyAccessToken(token: string): Promise<any> {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('jwt.access.secret'),
      });
    } catch (e) {
      throw new AppException('Token is invalid or expired');
    }
  }

  // Xác thực refresh token
  async verifyRefreshToken(token: string): Promise<any> {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('jwt.refresh.secret'),
      });
    } catch (e) {
      throw new AppException('Token is invalid or expired');
    }
  }

  /**
   * Kiểm tra xem access token có bị thu hồi hay không
   *
   * @param token
   */
  async isRevokedAccessToken(token: string): Promise<boolean> {
    const accessToken = await this.tokenRepository.findAccessToken(token);
    if (!accessToken) {
      throw new AppException('Token không tồn tại');
    }
    return accessToken.revoked == true;
  }

  /**
   * Xóa access token
   *
   * @param token
   */
  async revokeAccessToken(token: string): Promise<any> {
    const accessToken = await this.tokenRepository.findAccessToken(token);
    if (!accessToken) {
      throw new AppException('Token không tồn tại');
    }

    if (accessToken.revoked) {
      throw new AppException('Token đã bị thu hồi');
    }

    this.tokenRepository.revokeAccessToken(accessToken.id).catch(() => console.error);
    this.tokenRepository.revokeRefreshTokenFromAccessToken(accessToken.id).catch(() => console.error);
  }
}
