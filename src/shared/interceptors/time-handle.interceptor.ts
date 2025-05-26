import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

/**
 * Tính thời gian xử lý của request trong phạm vi route, controller
 */
@Injectable()
export class TimeHandleInterceptor implements NestInterceptor {
  private readonly logger = new Logger(TimeHandleInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const start = Date.now();

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - start;
        this.logger.log(`[${request.method}] ${request.url} - ${duration}ms`);
      }),
    );
  }
}
