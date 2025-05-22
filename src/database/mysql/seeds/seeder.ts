import { AppDataSource } from 'src/config/data-source';
import CreateRolesSeed from 'src/modules/auth/infrastructure/database/seeds/create-roles.seed';
import { DataSource } from 'typeorm';

AppDataSource.initialize()
  .then(async (dataSource: DataSource) => {
    await new CreateRolesSeed().run(dataSource);
    console.log('Seeding completed!');
    process.exit(0);
  })
  .catch(error => console.error('Seeding error', error));
