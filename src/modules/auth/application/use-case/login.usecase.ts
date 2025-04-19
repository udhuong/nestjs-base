import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { UserRepository } from '../../domain/contracts/user.interface';
import { AccessToken } from '../../domain/entities/access-token';
import { RefreshToken } from '../../domain/entities/refresh-token';
import { REPOSITORY } from '../../type';
import { TokenService } from '../services/token.service';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(REPOSITORY.UserRepository)
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
  ) {}

  /**
   * Đăng nhập cho người dùng
   *
   * @param email
   * @param password
   */
  async handle(email: string, password: string): Promise<[AccessToken, RefreshToken]> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Đăng nhập thất bại.');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Đăng nhập thất bại.');
    }

    const accessToken = await this.tokenService.createAccessToken(user);
    const refreshToken = await this.tokenService.createRefreshToken(user, accessToken.id);

    return [accessToken, refreshToken];
  }
}
