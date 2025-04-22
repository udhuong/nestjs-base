import { CacheModuleOptions, CacheOptionsFactory } from '@nestjs/common/cache';
import * as redisStore from 'cache-manager-ioredis';

export class CacheConfigService implements CacheOptionsFactory {
  createCacheOptions(): CacheModuleOptions {
    return {
      store: redisStore,
      host: 'localhost',
      port: 6379,
      ttl: 3600,
      password: 'admin',
      isGlobal: true,
    };
  }
}
