import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LoginRequest } from 'src/modules/auth/https/requests/login.request';
import { LoginAction } from 'src/modules/auth/actions/login.action';

@Controller('auth')
export class AuthController {
  constructor(private loginAction: LoginAction) {}

  /**
   * Người dùng đăng nhập
   *
   * @param request
   */
  @Post('login')
  async login(@Body() request: LoginRequest): Promise<any> {
    this.loginAction.handle(request.email, request.password);
  }

  /**
   * Lấy thông tin chi tiết user
   */
  @Get(':userId')
  async user(@Param('userId') userId: string): Promise<any> {
    // Hoặc @Param() params: any; params.userId
    console.log(userId);
  }
}
