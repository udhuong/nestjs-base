import { User } from 'src/modules/user/domain/entities/user';
import { UserStatus } from 'src/modules/user/domain/value-objects/user-status';

export class GetUserDetailResponse {
  static format(user: User): any {
    return {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone,
      status: user.status?.getLabel() ?? UserStatus.DEFAULT.getLabel(),
    };
  }
}
