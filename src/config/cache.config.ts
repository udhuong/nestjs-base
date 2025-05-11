// cache-config.service.ts
import { Injectable } from '@nestjs/common';
import { CacheModuleOptions, CacheOptionsFactory } from '@nestjs/common/cache';
import { redisStore } from 'cache-manager-ioredis';

@Injectable()
export class CacheConfigService implements CacheOptionsFactory {
  createCacheOptions(): CacheModuleOptions {
    return {
      store: redisStore as any,
      isGlobal: true,
      ttl: 3600,
      // Các thông số kết nối Redis
      storeConfig: {
        host: 'localhost',
        port: 6379,
        password: 'admin',
        db: 0,
      },
    };
  }
}
