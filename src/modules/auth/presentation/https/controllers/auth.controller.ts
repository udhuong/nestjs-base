import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { LoginRequest } from 'src/modules/auth/presentation/https/requests/login.request';
import { LoginAction } from 'src/modules/auth/domain/actions/login.action';
import { ConfigService } from '@nestjs/config';
import { RegisterRequest } from '../requests/register.request';
import { RegisterAction } from '../../../domain/actions/register.action';
import { Responder } from '../../../../../shared/responder';
import { RegisterResponse } from '../responses/register.response';
import { LoginResponse } from '../responses/login.response';
import { CurrentUser } from '../../../infrastructure/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../../infrastructure/guards/jwt.guard';

@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly loginAction: LoginAction,
    private readonly registerAction: RegisterAction,
  ) {}

  /**
   * Tạo mới tài khoản
   *
   * @param request
   */
  @Post('register')
  async register(@Body() request: RegisterRequest): Promise<any> {
    const authUser = await request.toDto();
    await this.registerAction.handle(authUser);
    return Responder.success(RegisterResponse.format(authUser));
  }

  /**
   * Người dùng đăng nhập
   *
   * @param request
   */
  @Post('login')
  async login(@Body() request: LoginRequest): Promise<any> {
    const token = await this.loginAction.handle(request.email, request.password);
    return Responder.success(LoginResponse.format(token), 'Đăng nhập thành công.');
  }

  @Post('refresh')
  async refreshToken(@Body() request: LoginRequest): Promise<any> {
    await this.loginAction.handle(request.email, request.password);
  }

  /**
   * Lấy thông tin chi tiết user
   */
  @Get('user')
  @UseGuards(JwtAuthGuard)
  async detail(@CurrentUser() user: any): Promise<any> {
    return Responder.success(user);
  }
}
