import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserRepositoryImpl } from './infrastructure/repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infrastructure/entities/user.entity';
import { AuthController } from './presentation/https/controllers/auth.controller';
import { LoginUseCase } from './application/use-case/login.usecase';
import { RegisterUseCase } from './application/use-case/register.usecase';
import { TokenRepositoryImpl } from './infrastructure/repositories/token.repository';
import { AccessTokenEntity } from './infrastructure/entities/access-token.entity';
import { RefreshTokenEntity } from './infrastructure/entities/refresh-token.entity';
import { TokenService } from './application/services/token.service';
import { REPOSITORY } from './type';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { PermissionService } from './application/services/permission.service';
import { RefreshTokenUseCase } from './application/use-case/refresh-token.usecase';

@Module({
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([UserEntity, AccessTokenEntity, RefreshTokenEntity]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.access.secret'),
        signOptions: { expiresIn: configService.get<string>('jwt.access.expiry') },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    JwtStrategy,
    TokenService,
    LoginUseCase,
    RegisterUseCase,
    RefreshTokenUseCase,
    PermissionService,
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
