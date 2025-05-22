import { User } from 'src/modules/user/domain/entities/user';

export class GetUserDetailResponse {
  static format(user: User): any {
    return {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone,
      status: user.status.getLabel(),
    };
  }
}
