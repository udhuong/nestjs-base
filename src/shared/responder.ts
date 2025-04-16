import { HttpException, HttpStatus } from '@nestjs/common';

export class Responder {
  static ok(message = 'Thao tác thành công.') {
    return {
      success: true,
      message,
      data: null,
      statusCode: HttpStatus.OK,
    };
  }

  static success(data: any = null, message = 'Thao tác thành công.') {
    return {
      success: true,
      message,
      data,
      statusCode: HttpStatus.OK,
    };
  }

  static fail(message = '', data: any = null, httpCode = HttpStatus.OK) {
    return {
      success: false,
      message,
      data,
      statusCode: httpCode,
    };
  }

  static failWithException(exception: any, message?: string, data: any = null, httpCode?: number) {
    const isNestHttpException = exception instanceof HttpException;

    const status = httpCode ?? (isNestHttpException ? exception.getStatus?.() : HttpStatus.INTERNAL_SERVER_ERROR);

    const finalMessage = message ?? (isNestHttpException ? exception.message : (exception?.message ?? 'Có lỗi xảy ra'));

    const body: any = {
      success: false,
      message: finalMessage,
      data,
    };

    // Hiển thị thêm thông tin nếu là môi trường local và query có ?debug=1
    if (process.env.NODE_ENV !== 'production' && this.isDebugMode()) {
      body.location = exception.stack?.split('\n')[1]?.trim();
      body.trace = exception.stack?.split('\n') || [];
    }

    return {
      ...body,
      statusCode: status,
    };
  }

  static jsonObject(data: any): object | null {
    return data !== null ? { ...data } : null;
  }

  static jsonArray(data: any): any[] {
    if (!Array.isArray(data)) return [];
    return [...data];
  }

  private static isDebugMode(): boolean {
    try {
      const url = new URL(`http://localhost${process.env.REQUEST_PATH || '/'}`);
      return url.searchParams.has('debug');
    } catch {
      return false;
    }
  }
}
