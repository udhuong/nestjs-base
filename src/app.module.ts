import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';
import configuration from 'src/config/configuration';
import { HttpModule } from 'src/shared/http.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseConfig } from './config/database.config';
import { AuthModule } from './modules/auth/auth.module';
import { CommonModule } from './modules/common/common.module';
import { UploadModule } from './modules/upload/upload.module';
import { UserModule } from './modules/user/user.module';
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('ACCESS_TOKEN_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('ACCESS_TOKEN_EXPIRY'), // ví dụ '3600s'
        },
      }),
      inject: [ConfigService],
    }),
    CacheModule.register({
      // Cache RAM
      // ttl: 10, // thời gian sống mặc định (10 giây)
      // max: 100, // số lượng key tối đa
      // isGlobal: true, // dùng toàn cục
      store: redisStore,
      host: 'localhost',
      port: 6379,
      password: 'admin',
      ttl: 300,
    }),
    AuthModule,
    UserModule,
    CommonModule,
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => new DatabaseConfig(configService).dbDefault,
    }),
    ScheduleModule.forRoot(),
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
