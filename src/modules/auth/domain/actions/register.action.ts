import { Inject, Injectable } from '@nestjs/common';
import { AuthUser } from '../entities/auth-user';
import { UserRepository } from '../contracts/user.repository.interface';
import { AppException } from '../../../../shared/exceptions/app-exception';
import { REPOSITORY } from '../../type';

@Injectable()
export class RegisterAction {
  constructor(
    @Inject(REPOSITORY.UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  /**
   * Đăng ký người dùng
   *
   * @param authUser
   */
  async handle(authUser: AuthUser): Promise<AuthUser> {
    const userExist = await this.userRepository.findByEmail(authUser.email);
    if (userExist) {
      throw new AppException('Người dùng đã tồn tại.');
    }
    authUser.userId = await this.userRepository.save(authUser);
    return authUser;
  }
}
