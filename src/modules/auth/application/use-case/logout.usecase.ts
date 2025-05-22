import { Injectable } from '@nestjs/common';
import { TokenService } from 'src/modules/auth/application/services/token.service';

@Injectable()
export class LogoutUseCase {
  constructor(private readonly tokenService: TokenService) {}

  /**
   * Đăng xuất người dùng
   */
  async handle(token: string): Promise<void> {
    await this.tokenService.revokeAccessToken(token);
  }
}
