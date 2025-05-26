import { ArgumentsHost, Catch, ExceptionFilter, ForbiddenException } from '@nestjs/common';
import { Response } from 'express';

/**
 * Exception filter to handle ForbiddenException.
 * This filter catches ForbiddenException and formats the response.
 * It can be used globally or for specific routes.
 *
 * Usage: @UseFilters(ForbiddenExceptionFilter) trên method của controller hoặc trên đầu controller.
 * global filter: app.useGlobalFilters(new ForbiddenExceptionFilter());
 */
@Catch(ForbiddenException)
export class ForbiddenExceptionFilter implements ExceptionFilter {
  catch(exception: ForbiddenException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      message: exception.message || 'Access denied',
      timestamp: new Date().toISOString(),
    });
  }
}
