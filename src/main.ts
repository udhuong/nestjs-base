import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as bodyParser from 'body-parser';

import { AppModule } from './app.module';
import { PermissionService } from './modules/auth/application/services/permission.service';
import { TokenService } from './modules/auth/application/services/token.service';
import { JwtAuthGuard } from './modules/auth/infrastructure/guards/jwt.guard';
import { PermissionGuard } from './modules/auth/infrastructure/guards/permission.guard';
import { REPOSITORY } from './modules/auth/type';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { ResponseInterceptor } from './shared/interceptor/response.interceptor';

async function bootstrap() {
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
    new PermissionGuard(app.get(Reflector), app.get(PermissionService), app.get(REPOSITORY.PermissionRepository)),
  );
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
