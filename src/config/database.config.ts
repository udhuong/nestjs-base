import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { CustomTypeORMLogger } from '../shared/custom-typeorm-logger';

export class DatabaseConfig {
  constructor(private readonly configService: ConfigService) {}

  get dbDefault(): TypeOrmModuleOptions {
    const config = this.configService.get('database.default');
    return {
      ...config,
      logger: new CustomTypeORMLogger(),
    };
  }
}
