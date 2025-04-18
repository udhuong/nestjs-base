import { Inject, Injectable } from '@nestjs/common';
import { AuthUser } from '../../domain/entities/auth-user';
import { UserRepository } from '../../domain/contracts/user.repository.interface';
import { AppException } from '../../../../shared/exceptions/app-exception';
import { REPOSITORY } from '../../type';
import * as bcrypt from 'bcryptjs';

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
