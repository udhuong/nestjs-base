import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { AppException } from '../exceptions/app-exception';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Lỗi không xác định';
    let trace = undefined;
    let location = undefined;

    if (exception instanceof HttpException) {
      httpStatus = exception.getStatus();
      const res = exception.getResponse();

      if (typeof res === 'string') {
        message = res;
      } else if (typeof res === 'object' && res && 'message' in res) {
        const r = res as any;
        message = Array.isArray(r.message) ? r.message.join(', ') : r.message;
      }
    } else if (exception instanceof AppException) {
      httpStatus = HttpStatus.OK;
      message = exception.message;
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    if (process.env.NODE_ENV !== 'production' && request.query?.debug !== undefined) {
      trace = (exception as any)?.stack?.split('\n') ?? [];
      location = trace?.[1]?.trim();
    }

    const body: any = {
      success: false,
      message,
      data: null,
    };

    if (trace) {
      body.trace = trace;
      body.location = location;
    }

    response.status(httpStatus).json(body);
  }
}
