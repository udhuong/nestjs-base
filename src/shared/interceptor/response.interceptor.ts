import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const res = ctx.getResponse();

    return next.handle().pipe(
      map(response => {
        // Ghi đè HTTP status nếu có
        if (response?.statusCode) {
          res.status(response.statusCode);
          delete response.statusCode; // tránh lặp trong JSON trả về
        }
        return response;
      }),
    );
  }
}
