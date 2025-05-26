import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

/**
 * Tính thời gian xử lý của request trong phạm vi toàn cục.
 */
@Injectable()
export class TimeHandleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      console.log(`Request to ${req.method} ${req.originalUrl} took ${duration}ms`);
    });
    next();
  }
}
