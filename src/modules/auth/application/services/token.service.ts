import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { AuthUser } from '../../domain/entities/auth-user';
import { ConfigService } from '@nestjs/config';
import { AppException } from '../../../../shared/exceptions/app-exception';

@Injectable()
export class TokenService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Tạo access token
   * @param user
   */
  async createAccessToken(user: AuthUser): Promise<string> {
    const payload = { user_id: user.userId }; // Dữ liệu bạn muốn gắn vào token

    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('jwt.access.secret'),
      expiresIn: this.configService.get<string>('jwt.access.expiry'),
    });
  }

  /**
   * Tạo refresh token
   * @param user
   */
  async createRefreshToken(user: AuthUser): Promise<string> {
    const payload = { user_id: user.userId }; // Dữ liệu bạn muốn gắn vào token

    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('jwt.refresh.secret'),
      expiresIn: this.configService.get<string>('jwt.refresh.expiry'),
    });
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
}
