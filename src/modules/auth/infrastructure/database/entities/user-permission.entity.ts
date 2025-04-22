import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';

import { PermissionEntity } from './permission.entity';
import { UserEntity } from './user.entity';

@Entity('user_permissions')
export class UserPermissionEntity {
  @PrimaryColumn({ name: 'user_id' })
  userId: number;

  @PrimaryColumn({ name: 'permission_id' })
  permissionId: number;

  @ManyToOne(() => UserEntity, user => user.permissions)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToOne(() => PermissionEntity, permission => permission.id)
  @JoinColumn({ name: 'permission_id' })
  permission: PermissionEntity;
}
