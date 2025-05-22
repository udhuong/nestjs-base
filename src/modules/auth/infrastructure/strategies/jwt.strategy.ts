import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { GetUserDetailByIdAction } from '../../domain/actions/get-user-detail-by-id.action';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    configService: ConfigService,
    private readonly getUserDetailByIdAction: GetUserDetailByIdAction,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // lấy token từ header Authorization
      secretOrKey: configService.get<string>('jwt.access.secret'),
    });
  }

  async validate(payload: any) {
    const user = await this.getUserDetailByIdAction.handle(payload.sub);
    if (!user) {
      return null;
    }
    return user;
  }
}
