import { AuthUser } from '../../domain/entities/auth-user';
import { Permission } from '../../domain/entities/permission';
import { Role } from '../../domain/entities/role';
import { UserEntity } from '../database/entities/user.entity';

export class UserFactory {
  static fromEntity(entity: UserEntity): AuthUser {
    const authUser = new AuthUser();
    authUser.userId = entity.id;
    authUser.name = entity.name;
    authUser.username = entity.username;
    authUser.email = entity.email;
    authUser.password = entity.password;

    const rolesMap = new Map<number, Role>();
    const permissionsMap = new Map<number, Permission>();

    if (entity.roles) {
      entity.roles.forEach(role => {
        const userRole = new Role();
        userRole.id = role.roleId;
        userRole.name = role.role.name;
        rolesMap.set(userRole.id, userRole);

        role.role.permissions.forEach(permission => {
          const userPermission = new Permission();
          userPermission.id = permission.id;
          userPermission.name = permission.name;
          permissionsMap.set(userPermission.id, userPermission);
        });
      });
    }

    if (entity.permissions) {
      entity.permissions.forEach(permission => {
        const userPermission = new Permission();
        userPermission.id = permission.permissionId;
        userPermission.name = permission.permission.name;
        permissionsMap.set(userPermission.id, userPermission);
      });
    }

    authUser.roles = Array.from(rolesMap.values());
    authUser.permissions = Array.from(permissionsMap.values());

    return authUser;
  }

  static fromDto(dto: AuthUser): UserEntity {
    const entity = new UserEntity();
    entity.name = dto.name;
    entity.username = dto.username;
    entity.email = dto.email;
    entity.password = dto.password;
    return entity;
  }
}
