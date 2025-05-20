import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from 'src/shared/services/http.service';

@Global()
@Module({
  providers: [
    {
      provide: 'USER_HTTP_SERVICE',
      useFactory: (configService: ConfigService) => {
        const service = new HttpService(configService);
        service.init({
          baseURL: configService.get<string>('USER_SERVICE_BASE_URL'),
        });
        service.setRefreshTokenUri(configService.get<string>('USER_SERVICE_REFRESH_TOKEN_URI'));
        return service;
      },
      inject: [ConfigService],
    },
  ],
  exports: ['USER_HTTP_SERVICE'],
})
export class HttpModule {}
