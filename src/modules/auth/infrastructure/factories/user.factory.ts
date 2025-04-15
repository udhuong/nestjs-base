import { UserEntity } from '../entities/user.entity';
import { AuthUser } from '../../domain/entities/auth-user';

export class UserFactory {
  static fromEntity(entity: UserEntity): AuthUser {
    const authUser = new AuthUser();
    authUser.userId = entity.id;
    authUser.name = entity.name;
    authUser.email = entity.email;
    authUser.password = entity.password;
    return authUser;
  }

  static fromDto(dto: AuthUser): UserEntity {
    const entity = new UserEntity();
    entity.name = dto.name;
    entity.email = dto.email;
    entity.password = dto.password;
    return entity;
  }
}
