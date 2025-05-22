import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheConfigService } from 'src/config/cache.config';
import { LogoutUseCase } from 'src/modules/auth/application/use-case/logout.usecase';

import { PermissionService } from './application/services/permission.service';
import { TokenService } from './application/services/token.service';
import { LoginUseCase } from './application/use-case/login.usecase';
import { RefreshTokenUseCase } from './application/use-case/refresh-token.usecase';
import { RegisterUseCase } from './application/use-case/register.usecase';
import { GetUserDetailByIdAction } from './domain/actions/get-user-detail-by-id.action';
import { AccessTokenEntity } from './infrastructure/database/entities/access-token.entity';
import { PermissionEntity } from './infrastructure/database/entities/permission.entity';
import { RefreshTokenEntity } from './infrastructure/database/entities/refresh-token.entity';
import { RoleEntity } from './infrastructure/database/entities/role.entity';
import { UserEntity } from './infrastructure/database/entities/user.entity';
import { PermissionRepositoryImpl } from './infrastructure/database/repositories/permission.repository';
import { TokenRepositoryImpl } from './infrastructure/database/repositories/token.repository';
import { UserRepositoryImpl } from './infrastructure/database/repositories/user.repository';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { AuthController } from './presentation/https/controllers/auth.controller';
import { REPOSITORY } from './type';

@Module({
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([UserEntity, AccessTokenEntity, RefreshTokenEntity, RoleEntity, PermissionEntity]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.access.secret'),
        signOptions: { expiresIn: configService.get<string>('jwt.access.expiry') },
      }),
      inject: [ConfigService],
    }),
    CacheModule.registerAsync({
      useClass: CacheConfigService,
    }),
  ],
  providers: [
    JwtStrategy,
    TokenService,
    PermissionService,
    LoginUseCase,
    RegisterUseCase,
    RefreshTokenUseCase,
    LogoutUseCase,
    {
      provide: REPOSITORY.UserRepository,
      useClass: UserRepositoryImpl,
    },
    {
      provide: REPOSITORY.TokenRepository,
      useClass: TokenRepositoryImpl,
    },
    {
      provide: REPOSITORY.PermissionRepository,
      useClass: PermissionRepositoryImpl,
    },
    GetUserDetailByIdAction,
  ],
})
export class AuthModule {}
