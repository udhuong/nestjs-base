import { User } from 'src/modules/user/domain/entities/user';
import { UserStatus } from 'src/modules/user/domain/value-objects/user-status';

export interface UserRepository {
  /**
   * Tìm người dùng qua id
   * @param id
   */
  findById(id: number): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  create(user: User): Promise<number>;
  update(user: User): Promise<void>;

  /**
   * Cập nhật trạng thái người dùng
   * @param id
   * @param status
   */
  updateStatus(id: number, status: UserStatus): Promise<void>;
  findAll(pagination: { page: number; limit: number }): Promise<{ data: User[]; total: number }>;
}
