import { Controller, Get, Inject, Param } from '@nestjs/common';
import { UserRepository } from 'src/modules/user/domain/contracts/user.repository';
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
}
