import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { plainToClass } from 'class-transformer';

import { REPOSITORY } from '../../type';
import { PermissionRepository } from '../contracts/permission.interface';
import { UserRepository } from '../contracts/user.interface';
import { AuthUser } from '../entities/auth-user';

@Injectable()
export class GetUserDetailByIdAction {
  constructor(
    @Inject(REPOSITORY.UserRepository)
    private readonly userRepository: UserRepository,
    @Inject(REPOSITORY.PermissionRepository)
    private readonly permissionRepository: PermissionRepository,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  /**
   * Lấy thông tin chi tiết user bao gồm role, permission
   * @param userId
   */
  async handle(userId: number): Promise<AuthUser> {
    const key = 'GetUserDetailByIdAction:' + userId;
    const cached = await this.cacheManager.get(key);
    console.log('>> Cache value:', cached);
    console.log('Cache store:', this.cacheManager); // Log Redis hoặc memory

    if (cached != null) {
      return plainToClass(AuthUser, cached);
    }
    const user = await this.userRepository.findByIdWithRolePermission(userId);
    if (!user) {
      return null;
    }
    await this.cacheManager.set(key, user, 60 * 60 * 24);

    return user;
  }
}
