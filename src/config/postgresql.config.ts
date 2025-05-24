import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CustomTypeORMLogger } from 'src/shared/custom-typeorm-logger';

export class PostgresqlConfig {
  constructor(private readonly configService: ConfigService) {}

  get dbDefault(): TypeOrmModuleOptions {
    const config = this.configService.get('database.postgresql');
    return {
      ...config,
      logger: new CustomTypeORMLogger(),
    };
  }
}
