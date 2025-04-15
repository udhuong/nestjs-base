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
import { LoginRequest } from 'src/modules/auth/https/requests/login.request';
import { LoginAction } from 'src/modules/auth/domain/actions/login.action';
import { User } from 'src/modules/auth/decorator/user.decorator';
import { ConfigService } from '@nestjs/config';

@Controller('api/auth')
export class AuthController {
  constructor(
    private configService: ConfigService,
    private loginAction: LoginAction,
  ) {}

  /**
   * Người dùng đăng nhập
   *
   * @param request
   */
  @Post('login')
  async login(@Body() request: LoginRequest): Promise<any> {
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

  @Get('logout')
  async logout(@User() user: any): Promise<any> {
    console.log(user);
  }
}
