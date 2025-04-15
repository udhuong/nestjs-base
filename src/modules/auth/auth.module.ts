import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserRepositoryImpl } from './infrastructure/repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infrastructure/entities/user.entity';
import { AuthController } from './presentation/https/controllers/auth.controller';
import { LoginAction } from './domain/actions/login.action';
import { RegisterAction } from './domain/actions/register.action';
import { TokenRepositoryImpl } from './infrastructure/repositories/token.repository';
import { AccessTokenEntity } from './infrastructure/entities/access-token.entity';
import { RefreshTokenEntity } from './infrastructure/entities/refresh-token.entity';
import { TokenService } from './application/services/token.service';
import { REPOSITORY } from './type';

@Module({
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([UserEntity, AccessTokenEntity, RefreshTokenEntity]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    JwtStrategy,
    TokenService,
    LoginAction,
    RegisterAction,
    {
      provide: REPOSITORY.UserRepository,
      useClass: UserRepositoryImpl,
    },
    {
      provide: REPOSITORY.TokenRepository,
      useClass: TokenRepositoryImpl,
    },
  ],
})
export class AuthModule {}
