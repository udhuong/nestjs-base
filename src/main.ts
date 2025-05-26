import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as Sentry from '@sentry/nestjs';
import * as bodyParser from 'body-parser';
import { LoggerMiddleware } from 'src/shared/middlewares/logger-request.middleware';
import { TimeHandleMiddleware } from 'src/shared/middlewares/time-handle.middleware';

import { AppModule } from './app.module';
import { PermissionService } from './modules/auth/application/services/permission.service';
import { TokenService } from './modules/auth/application/services/token.service';
import { JwtAuthGuard } from './modules/auth/infrastructure/guards/jwt.guard';
import { PermissionGuard } from './modules/auth/infrastructure/guards/permission.guard';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { ResponseInterceptor } from './shared/interceptors/response.interceptor';

async function bootstrap() {
  if (process.env.SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      tracesSampleRate: 1.0,
      environment: process.env.NODE_ENV || 'development',
      sendDefaultPii: true,
    });
  }

  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: false, //Muốn tuỳ chỉnh body-parser, để có thể dùng form-data upload file
  });
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  ); // bật cho toàn bộ app
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalGuards(
    new JwtAuthGuard(app.get(Reflector), app.get(TokenService)),
    new PermissionGuard(app.get(Reflector), app.get(PermissionService)),
  );
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Tự động chuyển đổi dữ liệu thành instance của DTO
      whitelist: false, // Loại bỏ các thuộc tính không có trong DTO (true)
      forbidNonWhitelisted: false, //// Ném lỗi nếu có thuộc tính không được định nghĩa trong DTO (true
    }),
  );
  app.use(new LoggerMiddleware().use);
  app.use(new TimeHandleMiddleware().use);
  await app.listen(3000);
}

bootstrap();
