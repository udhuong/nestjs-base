import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { AppException } from '../../../../shared/exceptions/app-exception';
import { UserRepository } from '../../domain/contracts/user.interface';
import { AuthUser } from '../../domain/entities/auth-user';
import { REPOSITORY } from '../../type';

@Injectable()
export class RegisterUseCase {
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
    authUser.password = await bcrypt.hash(authUser.passwordRaw, 10);
    authUser.userId = await this.userRepository.save(authUser);
    return authUser;
  }
}
