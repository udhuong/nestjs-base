import { User } from 'src/modules/user/domain/entities/user';
import { UserStatus } from 'src/modules/user/domain/value-objects/user-status';
import { UserEntity } from 'src/modules/user/infrastructure/database/mysql/entities/user.entity';

export class UserFactory {
  static fromEntityTypeOrm(entity: UserEntity): User | null {
    if (!entity) {
      return null;
    }

    const user = new User();
    user.id = entity.id;
    user.name = entity.name;
    user.username = entity.username;
    user.email = entity.email;
    user.phone = entity.phone;
    user.status = UserStatus.tryFrom(entity.status);
    user.password = entity.password;
    user.created = entity.created;
    user.modified = entity.modified;

    return user;
  }
}
