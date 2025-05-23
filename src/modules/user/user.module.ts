import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity as UserEntityMysql } from 'src/modules/user/infrastructure/database/mysql/entities/user.entity';
import { UserEntity as UserEntityPg } from 'src/modules/user/infrastructure/database/postgresql/entities/user.entity';
import { UserRepositoryImpl } from 'src/modules/user/infrastructure/database/postgresql/repositories/user.repository.impl';
import { UserController } from 'src/modules/user/presentation/http/controllers/user.controller';
import { CONNECTION, REPOSITORY } from 'src/modules/user/user-type';

const CONTROLLERS = [UserController];
const PROVIDER_REPOSITORIES = [
  {
    provide: REPOSITORY.UserRepository,
    useClass: UserRepositoryImpl,
  },
];

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntityMysql]),
    TypeOrmModule.forFeature([UserEntityPg], CONNECTION.POSTGRESQL),
  ],
  controllers: [...CONTROLLERS],
  providers: [...PROVIDER_REPOSITORIES],
})
export class UserModule {}
