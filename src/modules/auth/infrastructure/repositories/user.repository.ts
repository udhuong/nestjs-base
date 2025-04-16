import { UserRepository } from '../../domain/contracts/user.repository.interface';
import { Injectable } from '@nestjs/common';
import { AuthUser } from '../../domain/entities/auth-user';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UserFactory } from '../factories/user.factory';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
  ) {}

  /**
   * Tìm người dùng qua email
   * @param email
   */
  async findByEmail(email: string): Promise<AuthUser | null> {
    const entity = await this.userEntity.findOne({
      where: { email },
    });
    if (!entity) {
      return null;
    }

    return UserFactory.fromEntity(entity);
  }

  /**
   * Tìm người dùng qua id
   * @param id
   */
  async findById(id: number): Promise<AuthUser | null> {
    const entity = await this.userEntity.findOne({
      where: { id },
    });
    if (!entity) {
      return null;
    }

    return UserFactory.fromEntity(entity);
  }

  /**
   * Tạo mới người dùng
   * có hàm .create() - Chỉ tạo đối tượng trong bộ nhớ (chưa lưu vào DB)
   *
   * @param user
   */
  async save(user: AuthUser): Promise<number> {
    const saved = await this.userEntity.save(UserFactory.fromDto(user));
    return saved.id;
  }
}
