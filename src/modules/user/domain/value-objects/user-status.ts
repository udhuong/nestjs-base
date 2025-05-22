import { EnumNumberLike } from 'src/shared/enum-like';

export class UserStatus extends EnumNumberLike {
  static readonly DEFAULT = new UserStatus(0, 'Không xác định');
  static readonly ACTIVE = new UserStatus(1, 'Đang hoạt động');
  static readonly INACTIVE = new UserStatus(2, 'Không hoạt động');
  static readonly PENDING = new UserStatus(3, 'Chờ xác minh');
  static readonly BANNED = new UserStatus(4, 'Khóa tài khoản');
}
