import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

/**
 * Class middleware
 */
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): any {
    console.log('Request...');
    next();
  }
}

/**
 * Hàm middleware
 * @param req
 * @param res
 * @param next
 */
export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`Request...`);
  next();
}
