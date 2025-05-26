import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
/**
 * Guard to check if the user is an admin.
 * Sử dụng: @UseGuards(AdminGuard) trên method của controller hoặc trên đầu controller.
 * Theo mặc định, khi Guard trả về false, NestJS sẽ ném một HTTP 403 Forbidden Exception (ForbiddenException) với thông báo lỗi tiêu chuẩn là "Forbidden resource".
 */
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request['user']; // Lấy thông tin người dùng từ req.user (do Middleware gắn vào)

    if (!user || user.role !== 'admin') {
      throw new ForbiddenException('Only admins can access this resource');
    }

    return true; // Cho phép yêu cầu đi tiếp nếu là admin
  }
}
