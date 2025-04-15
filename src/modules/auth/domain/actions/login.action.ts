import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../contracts/user.repository.interface';
import * as bcrypt from 'bcryptjs';
import { Token } from '../entities/token';
import { TokenService } from '../../application/services/token.service';
import { TokenRepository } from '../contracts/token.repository.interface';
import { REPOSITORY } from '../../type';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LoginAction {
  constructor(
    @Inject(REPOSITORY.TokenRepository)
    private readonly tokenRepository: TokenRepository,
    @Inject(REPOSITORY.UserRepository)
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Đăng nhập cho người dùng
   *
   * @param email
   * @param password
   */
  async handle(email: string, password: string): Promise<Token> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Đăng nhập thất bại.');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Đăng nhập thất bại.');
    }

    const token = new Token();
    token.accessToken = await this.tokenService.createAccessToken(user);
    token.accessExpiresIn = new Date(Date.now() + Number(this.configService.get<string>('jwt.access.expiry')) * 1000);
    token.refreshToken = await this.tokenService.createRefreshToken(user);
    token.refreshExpiresIn = new Date(Date.now() + Number(this.configService.get<string>('jwt.refresh.expiry')) * 1000);

    await Promise.all([
      this.tokenRepository.createAccessToken(token, user.userId),
      this.tokenRepository.createRefreshToken(token),
    ]);

    return token;
  }
}
