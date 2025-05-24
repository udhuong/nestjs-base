import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheConfigService } from 'src/config/cache.config';
import configuration from 'src/config/configuration';
import { MongodbConfig } from 'src/config/mongodb.config';
import { MysqlConfig } from 'src/config/mysql.config';
import { PostgresqlConfig } from 'src/config/postgresql.config';
import { MongoLoggerService } from 'src/modules/user/infrastructure/database/mongodb/mongo-logger.service';
import { CONNECTION } from 'src/modules/user/user-type';
import { HttpModule } from 'src/shared/http.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { CommonModule } from './modules/common/common.module';
import { UploadModule } from './modules/upload/upload.module';
import { UserModule } from './modules/user/user.module';

const MODULES = [AuthModule, UserModule, CommonModule, HttpModule, UploadModule];

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
    CacheModule.registerAsync({
      useClass: CacheConfigService,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [configuration],
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => new MysqlConfig(configService).dbDefault,
      // name: CONNECTION.MYSQL, để mặc định sẽ có name là 'default'
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Phải import ConfigModule ở đây
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => new PostgresqlConfig(configService).dbDefault,
      name: CONNECTION.POSTGRESQL,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // Phải import ConfigModule ở đây
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => new MongodbConfig(configService).dbDefault,
      connectionName: CONNECTION.MONGODB,
    }),
    ...MODULES,
  ],
  controllers: [AppController],
  providers: [AppService, MongoLoggerService],
})
export class AppModule {
  constructor(private readonly loggerService: MongoLoggerService) {} // <- buộc Nest khởi tạo
}
