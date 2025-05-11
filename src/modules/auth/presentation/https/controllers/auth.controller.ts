import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { LoginUseCase } from 'src/modules/auth/application/use-case/login.usecase';
import { LogoutUseCase } from 'src/modules/auth/application/use-case/logout.usecase';
import { RefreshTokenUseCase } from 'src/modules/auth/application/use-case/refresh-token.usecase';
import { RegisterUseCase } from 'src/modules/auth/application/use-case/register.usecase';
import { GetUserDetailByIdAction } from 'src/modules/auth/domain/actions/get-user-detail-by-id.action';
import { AuthUser } from 'src/modules/auth/domain/entities/auth-user';
import { ApiPublic } from 'src/modules/auth/infrastructure/decorators/api-public.decorator';
import { CurrentUser } from 'src/modules/auth/infrastructure/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/modules/auth/infrastructure/guards/jwt.guard';
import { LoginRequest } from 'src/modules/auth/presentation/https/requests/login.request';
import { RegisterRequest } from 'src/modules/auth/presentation/https/requests/register.request';
import { LoginResponse } from 'src/modules/auth/presentation/https/responses/login.response';
import { MeResponse } from 'src/modules/auth/presentation/https/responses/me.response';
import { RegisterResponse } from 'src/modules/auth/presentation/https/responses/register.response';
import { Responder } from 'src/shared/responder';

@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
    private readonly logoutUseCase: LogoutUseCase,
    private readonly getUserDetailByIdAction: GetUserDetailByIdAction,
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

  /**
   * Lấy thông tin chi tiết user
   */
  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req: Request): Promise<any> {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
    await this.logoutUseCase.handle(token);
    return Responder.ok('Đăng xuất thành công');
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getByUserId(@Param('id') id: string): Promise<any> {
    const user = await this.getUserDetailByIdAction.handle(Number(id));
    return Responder.success(MeResponse.format(user), 'Lấy thông tin thành công.');
  }
}
