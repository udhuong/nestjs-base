import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthService } from 'src/modules/auth/services/auth.service';
import { AuthController } from 'src/modules/auth/https/controllers/auth.controller';
import { LoggerMiddleware } from 'src/modules/auth/middleware/logger.middleware';
import { LoginAction } from 'src/modules/auth/actions/login.action';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LoginAction],
  exports: [AuthService], // Module user muốn sử dụng AuthService
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({
      path: 'auth',
      method: RequestMethod.GET,
    });
  }
}
