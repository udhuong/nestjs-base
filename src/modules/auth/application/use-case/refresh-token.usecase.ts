import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AccessToken } from '../../domain/entities/access-token';
import { REPOSITORY } from '../../type';
import { UserRepository } from '../../domain/contracts/user.repository.interface';
import { TokenService } from '../services/token.service';
import { TokenRepository } from '../../domain/contracts/token.repository.interface';
import { RefreshToken } from '../../domain/entities/refresh-token';

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    @Inject(REPOSITORY.UserRepository)
    private readonly userRepository: UserRepository,
    @Inject(REPOSITORY.TokenRepository)
    private readonly tokenRepository: TokenRepository,
    private readonly tokenService: TokenService,
  ) {}

  /**
   * Làm mới token
   *
   * @param refreshToken
   */
  async handle(refreshToken: string): Promise<[AccessToken, RefreshToken]> {
    const payload = await this.tokenService.verifyRefreshToken(refreshToken);
    const refreshTokenExist = await this.tokenRepository.findRefreshToken(refreshToken);
    if (!refreshTokenExist || refreshTokenExist.expiryDate < new Date() || refreshTokenExist.revoked == true) {
      throw new UnauthorizedException('Refresh token không hợp lệ.');
    }
    const user = await this.userRepository.findById(payload.sub);

    // Tạo mới access token và refresh token
    const accessTokenNew = await this.tokenService.createAccessToken(user);
    const refreshTokenNew = await this.tokenService.createRefreshToken(user, accessTokenNew.id);

    // Vô hiệu hóa token cũ
    this.tokenRepository.revokeAccessToken(refreshTokenExist.accessTokenId).catch(() => console.error);
    this.tokenRepository.revokeRefreshToken(refreshTokenExist.id).catch(() => console.error);

    return [accessTokenNew, refreshTokenNew];
  }
}
