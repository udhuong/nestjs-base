import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { CustomTypeORMLogger } from '../shared/custom-typeorm-logger';

export class MysqlConfig {
  constructor(private readonly configService: ConfigService) {}

  get dbDefault(): TypeOrmModuleOptions {
    const config = this.configService.get('database.mysql');
    console.log('MYSQL CONFIG', config);
    return {
      ...config,
      logger: new CustomTypeORMLogger(),
    };
  }
}
