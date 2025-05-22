import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { UserPermissionEntity } from './user-permission.entity';
import { UserRoleEntity } from './user-role.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  password: string;

  @Column()
  status: number;

  @Column('datetime')
  created: Date;

  @Column('datetime')
  modified: Date;

  @OneToMany(() => UserRoleEntity, role => role.user)
  roles: UserRoleEntity[];

  @OneToMany(() => UserPermissionEntity, permission => permission.user)
  permissions: UserPermissionEntity[];
}
