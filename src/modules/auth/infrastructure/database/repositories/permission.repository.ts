import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { PermissionRepository } from '../../../domain/contracts/permission.interface';
import { Permission } from '../../../domain/entities/permission';
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
   * ORM thuần
   * @param guard
   */
  async getAllRoleByGuard(guard: string): Promise<Map<number, Role>> {
    const rolesWithPermissions = await this.roleRepository.find({
      relations: ['permissions'],
      where: {
        guardName: guard,
      },
    });

    const roles = new Map<number, Role>();
    for (const item of rolesWithPermissions) {
      const role = new Role();
      role.id = item.id;
      role.name = item.name;
      role.permissions = item.permissions.map(permission => {
        const per = new Permission();
        per.id = permission.id;
        per.name = permission.name;
        return per;
      });
      roles.set(item.id, role);
    }

    return roles;
  }

  /**
   * Lấy tất cả quyền theo guard
   * Làm theo kiểu query builder, và chỉ định tên bảng
   * Thuần 100% ko liên quan gì entity
   * Raw query bằng QueryBuilder
   * @param guard
   */
  async getAllRoleByGuardV2(guard: string): Promise<Map<number, Role>> {
    const rows = await this.dataSource
      .createQueryBuilder()
      .select(['r.id AS roleId', 'r.name AS roleName', 'p.id AS permissionId', 'p.name AS permissionName'])
      .from('roles', 'r') // .from(RoleEntity, 'r') cũng được
      .leftJoin('role_permissions', 'rp', 'r.id = rp.role_id')
      .leftJoin('permissions', 'p', 'rp.permission_id = p.id')
      .where('r.guard_name = :guard', { guard })
      .getRawMany();
    if (!rows || rows.length === 0) {
      return new Map<number, Role>();
    }

    const roles = new Map<number, Role>();
    for (const item of rows) {
      const roleId = item.roleId;
      let role = roles.get(roleId);

      if (!role) {
        role = new Role();
        role.id = roleId;
        role.name = item.roleName;
        role.permissions = [];
        roles.set(roleId, role);
      }

      // Nếu không có permissionId thì bỏ qua
      if (!item.permissionId) {
        continue;
      }

      const permission = new Permission();
      permission.id = item.permissionId;
      permission.name = item.permissionName;
      role.permissions.push(permission);
    }

    return roles;
  }

  /**
   * Lấy tất cả quyền theo guard
   * Hybrid: QueryBuilder + Entity
   * @param guard
   */
  async getAllRoleByGuardV3(guard: string): Promise<Map<number, Role>> {
    const rows = await this.dataSource
      .createQueryBuilder(RoleEntity, 'r')
      .leftJoinAndSelect('r.permissions', 'p')
      .where('r.guardName = :guard', { guard })
      .getMany();
    if (!rows || rows.length === 0) {
      return new Map<number, Role>();
    }

    const roles = new Map<number, Role>();

    for (const item of rows) {
      const role = new Role();
      role.id = item.id;
      role.name = item.name;
      role.permissions = item.permissions.map(permission => {
        const per = new Permission();
        per.id = permission.id;
        per.name = permission.name;
        return per;
      });
      roles.set(item.id, role);
    }

    return roles;
  }
}
