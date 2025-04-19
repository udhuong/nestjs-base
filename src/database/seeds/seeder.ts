import { DataSource } from 'typeorm';

import { AppDataSource } from '../../config/data-source';
import CreateRolesSeed from '../../modules/auth/infrastructure/database/seeds/create-roles.seed';

AppDataSource.initialize()
  .then(async (dataSource: DataSource) => {
    await new CreateRolesSeed().run(dataSource);
    console.log('Seeding completed!');
    process.exit(0);
  })
  .catch(error => console.error('Seeding error', error));
