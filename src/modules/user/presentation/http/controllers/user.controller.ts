import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ApiPublic } from 'src/modules/auth/infrastructure/decorators/api-public.decorator';
import { UserRepository } from 'src/modules/user/domain/contracts/user.repository';
import { CreateUserRequest } from 'src/modules/user/presentation/http/requests/create-user.request';
import { GetUserDetailResponse } from 'src/modules/user/presentation/http/responses/get-user-detail.response';
import { REPOSITORY } from 'src/modules/user/user-type';
import { AppException } from 'src/shared/exceptions/app-exception';
import { Responder } from 'src/shared/responder';

@Controller('api/v1/user')
export class UserController {
  constructor(
    @Inject(REPOSITORY.UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  /**
   * Lấy thông tin người dùng theo username
   * @param id
   */
  @Get(':id')
  async getById(@Param('id') id: number): Promise<any> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new AppException('Không tìm thấy người dùng');
    }
    return Responder.success(GetUserDetailResponse.format(user), 'Lấy thông tin người dùng thành công');
  }

  /**
   * Tạo mới người dùng
   * @param request
   */
  @ApiPublic()
  @Post('')
  async createUser(@Body() request: CreateUserRequest): Promise<any> {
    const user = await request.toEntity();
    user.id = await this.userRepository.create(user);

    return Responder.success(GetUserDetailResponse.format(user), 'Tạo người dùng thành công');
  }
}
