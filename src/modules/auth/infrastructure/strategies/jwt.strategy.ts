import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { REPOSITORY } from '../../type';
import { UserRepository } from '../../domain/contracts/user.repository.interface';
import { Inject } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    configService: ConfigService,
    @Inject(REPOSITORY.UserRepository)
    private readonly userRepository: UserRepository,
  ) {
    console.log({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.access.secret'),
    });
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // lấy token từ header Authorization
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.access.secret'),
    });
  }

  async validate(payload: any) {
    console.log(payload);
    const user = await this.userRepository.findById(payload.sub);
    if (!user) {
      return null;
    }
    return user;
  }
}
