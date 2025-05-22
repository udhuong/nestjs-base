import { DataSource } from 'typeorm';

import { AppDataSource } from '../../../../../config/data-source';
import { Permission } from '../../../domain/value-objects/permission.enum';
import { Role } from '../../../domain/value-objects/role.enum';
import { PermissionEntity } from '../entities/permission.entity';
import { RoleEntity } from '../entities/role.entity';

export default class CreateRolesSeed {
  public async run(dataSource: DataSource): Promise<void> {
    const roleRepository = dataSource.getRepository(RoleEntity);
    const permissionRepository = dataSource.getRepository(PermissionEntity);

    const roleData = [];
    Object.values(Role).forEach(role => {
      roleData.push({
        name: role,
        guardName: 'api',
      });
    });
    const permissionData = [];
    Object.values(Permission).forEach(permission => {
      permissionData.push({
        name: permission,
        guardName: 'api',
      });
    });

    await roleRepository.save(roleData);
    await permissionRepository.save(permissionData);
    await dataSource
      .createQueryBuilder()
      .insert()
      .into('role_permissions')
      .values([
        { role_id: 1, permission_id: 1 },
        { role_id: 1, permission_id: 2 },
        { role_id: 1, permission_id: 3 },
        { role_id: 1, permission_id: 4 },
        { role_id: 1, permission_id: 5 },
        { role_id: 1, permission_id: 6 },
        { role_id: 1, permission_id: 7 },
        { role_id: 1, permission_id: 8 },
        { role_id: 1, permission_id: 9 },
        { role_id: 1, permission_id: 10 },
        { role_id: 2, permission_id: 1 },
        { role_id: 2, permission_id: 2 },
        { role_id: 2, permission_id: 3 },
        { role_id: 2, permission_id: 4 },
        { role_id: 2, permission_id: 5 },
        { role_id: 3, permission_id: 6 },
        { role_id: 3, permission_id: 7 },
        { role_id: 3, permission_id: 8 },
        { role_id: 3, permission_id: 9 },
        { role_id: 3, permission_id: 10 },
      ])
      .execute();

    await dataSource
      .createQueryBuilder()
      .insert()
      .into('user_roles')
      .values([{ role_id: 1, user_id: 1 }])
      .execute();
  }
}

AppDataSource.initialize()
  .then(async (dataSource: DataSource) => {
    await new CreateRolesSeed().run(dataSource);
    console.log('Seeding completed!');
    process.exit(0);
  })
  .catch(error => console.error('Seeding error', error));
