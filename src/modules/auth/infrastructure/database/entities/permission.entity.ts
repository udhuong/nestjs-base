import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { RoleEntity } from './role.entity';

@Entity({ name: 'permissions' })
export class PermissionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'guard_name' })
  guardName: string;

  @Column('datetime')
  created: Date;

  @Column('datetime')
  modified: Date;

  @ManyToMany(() => RoleEntity, role => role.permissions)
  roles: RoleEntity[];
}
