import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export class DatabaseConfig {
  constructor(private readonly configService: ConfigService) {}

  get dbDefault(): TypeOrmModuleOptions {
    return this.configService.get<TypeOrmModuleOptions>('database.default');
  }
}
