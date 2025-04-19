import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { PermissionRepository } from '../../../domain/contracts/permission.interface';
import { Role } from '../../../domain/entities/role';
import { PermissionEntity } from '../entities/permission.entity';
import { RoleEntity } from '../entities/role.entity';

@Injectable()
export class PermissionRepositoryImpl implements PermissionRepository {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    @InjectRepository(PermissionEntity)
    private readonly permissionRepository: Repository<PermissionEntity>,
    private readonly dataSource: DataSource,
  ) {}

  /**
   * Lấy tất cả quyền theo guard
   *
   * @param guard
   */
  async getAllRoleByGuard(guard: string): Promise<Map<number, Role>> {
    const entities: RoleEntity[] = await this.roleRepository.find({
      select: ['id', 'name'],
      where: {
        guardName: guard,
      },
    });
    if (!entities || entities.length === 0) {
      return new Map<number, Role>();
    }

    // Lấy danh sách permission theo role
    const roleIds = entities.map(role => role.id);
    console.log(roleIds);
    // const rolesWithPermissions = await this.roleRepository.find({
    //   relations: ['permissions'],
    //   where: {
    //     id: In(roleIds),
    //   },
    // });

    const roles = new Map<number, Role>();
    for (const entity of entities) {
      const role = new Role();
      role.id = entity.id;
      role.name = entity.name;
      roles.set(entity.id, role);
    }
    return roles;
  }
}
