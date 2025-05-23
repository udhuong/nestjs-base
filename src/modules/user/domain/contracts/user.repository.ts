import { User } from 'src/modules/user/domain/entities/user';
import { UserStatus } from 'src/modules/user/domain/value-objects/user-status';

export interface UserRepository {
  /**
   * Tìm người dùng qua id
   * @param id
   */
  findById(id: number): Promise<User | null>;

  /**
   * Tìm người dùng qua username
   * @param username
   */
  findByUsername(username: string): Promise<User | null>;

  /**
   * Tạo người dùng
   * @param user
   */
  create(user: User): Promise<number>;

  /**
   * Cập nhật người dùng
   * @param user
   */
  update(user: User): Promise<void>;

  /**
   * Cập nhật trạng thái người dùng
   * @param id
   * @param status
   */
  updateStatus(id: number, status: UserStatus): Promise<void>;

  /**
   * Lấy danh sách người dùng phân trang
   * @param pagination
   */
  findAll(pagination: { page: number; limit: number }): Promise<{ data: User[]; total: number }>;
}
