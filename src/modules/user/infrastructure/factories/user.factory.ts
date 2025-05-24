import { User } from 'src/modules/user/domain/entities/user';
import { UserStatus } from 'src/modules/user/domain/value-objects/user-status';
import { UserDocument } from 'src/modules/user/infrastructure/database/mongodb/schema/user.model';
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

  static fromDocumentMongoose(document: UserDocument): User | null {
    if (!document) {
      return null;
    }

    const user = new User();
    user.id = document.user_id;
    user.name = document.name;
    user.username = document.username;
    user.email = document.email;
    user.phone = document.phone;
    user.status = UserStatus.tryFrom(document.status);
    user.password = document.password;
    user.created = document.created;
    user.modified = document.modified;

    return user;
  }
}
