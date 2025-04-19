import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserRepository } from '../../domain/contracts/user.interface';
import { REPOSITORY } from '../../type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    configService: ConfigService,
    @Inject(REPOSITORY.UserRepository)
    private readonly userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // lấy token từ header Authorization
      secretOrKey: configService.get<string>('jwt.access.secret'),
    });
  }

  async validate(payload: any) {
    const user = await this.userRepository.findById(payload.sub);
    if (!user) {
      return null;
    }
    return user;
  }
}
