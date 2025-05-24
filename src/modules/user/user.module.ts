import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema, UserSchemaName } from 'src/modules/user/infrastructure/database/mongodb/schema/user.schema';
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
const MONGO_SCHEMA = [
  {
    name: UserSchemaName,
    schema: UserSchema,
  },
];

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntityMysql]),
    TypeOrmModule.forFeature([UserEntityPg], CONNECTION.POSTGRESQL),
    MongooseModule.forFeature(MONGO_SCHEMA, CONNECTION.MONGODB),
  ],
  controllers: [...CONTROLLERS],
  providers: [...PROVIDER_REPOSITORIES],
})
export class UserModule {}
