import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginRequest } from 'src/modules/auth/presentation/https/requests/login.request';
import { LoginAction } from 'src/modules/auth/domain/actions/login.action';
import { ConfigService } from '@nestjs/config';
import { RegisterRequest } from '../requests/register.request';
import { RegisterAction } from '../../../domain/actions/register.action';
import { Responder } from '../../../../../shared/responder';
import { RegisterResponse } from '../responses/register.response';
import { LoginResponse } from '../responses/login.response';

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
  @Get(':userId')
  @UsePipes(ValidationPipe)
  async user(@Param('userId') userId: string): Promise<any> {
    // Hoặc @Param() params: any; params.userId
    console.log(userId);
    throw new HttpException(
      {
        success: true,
        data: {
          app_name: this.configService.get<string>('app.name', 'Không tìm thấy'),
          port: this.configService.get<string>('app.port', 'Không tìm thấy'),
          db_name: this.configService.get<string>('DB_PORT', 'Không tìm thấy'),
        },
        message: 'hello',
      },
      HttpStatus.OK,
    );
  }
}
