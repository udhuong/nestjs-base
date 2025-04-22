import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';

import { RoleEntity } from './role.entity';
import { UserEntity } from './user.entity';

@Entity('user_roles')
export class UserRoleEntity {
  @PrimaryColumn({ name: 'user_id' })
  userId: number;

  @PrimaryColumn({ name: 'role_id' })
  roleId: number;

  @ManyToOne(() => UserEntity, user => user.roles)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToOne(() => RoleEntity, role => role.id)
  @JoinColumn({ name: 'role_id' })
  role: RoleEntity;
}
