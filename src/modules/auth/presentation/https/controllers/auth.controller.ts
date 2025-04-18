import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { LoginRequest } from 'src/modules/auth/presentation/https/requests/login.request';
import { LoginUseCase } from 'src/modules/auth/application/use-case/login.usecase';
import { RegisterRequest } from '../requests/register.request';
import { RegisterUseCase } from '../../../application/use-case/register.usecase';
import { Responder } from '../../../../../shared/responder';
import { RegisterResponse } from '../responses/register.response';
import { LoginResponse } from '../responses/login.response';
import { CurrentUser } from '../../../infrastructure/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../../infrastructure/guards/jwt.guard';
import { RefreshTokenUseCase } from '../../../application/use-case/refresh-token.usecase';
import { ApiPublic } from '../../../infrastructure/decorators/api-public.decorator';
import { AuthUser } from '../../../domain/entities/auth-user';
import { MeResponse } from '../responses/me.response';

@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
  ) {}

  /**
   * Tạo mới tài khoản
   *
   * @param request
   */
  @ApiPublic()
  @Post('register')
  async register(@Body() request: RegisterRequest): Promise<any> {
    const authUser = await request.toDto();
    await this.registerUseCase.handle(authUser);
    return Responder.success(RegisterResponse.format(authUser));
  }

  /**
   * Người dùng đăng nhập
   *
   * @param request
   */
  @ApiPublic()
  @Post('login')
  async login(@Body() request: LoginRequest): Promise<any> {
    const [accessToken, refreshToken] = await this.loginUseCase.handle(request.email, request.password);
    return Responder.success(LoginResponse.format(accessToken, refreshToken), 'Đăng nhập thành công.');
  }

  /**
   * Làm mới access token
   *
   * @param refreshTokenOld
   */
  @ApiPublic()
  @Post('refresh')
  async refreshToken(@Body('refresh_token') refreshTokenOld: string): Promise<any> {
    const [accessToken, refreshToken] = await this.refreshTokenUseCase.handle(refreshTokenOld);
    return Responder.success(LoginResponse.format(accessToken, refreshToken), 'Lấy token mới thành công.');
  }

  /**
   * Lấy thông tin chi tiết user
   */
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getInfo(@CurrentUser() user: AuthUser): Promise<any> {
    return Responder.success(MeResponse.format(user), 'Lấy thông tin thành công.');
  }
}
