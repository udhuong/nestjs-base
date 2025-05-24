import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepositoryImpl } from 'src/modules/user/infrastructure/database/mongodb/repositories/user.repository.impl';
import { UserModel, UserSchema } from 'src/modules/user/infrastructure/database/mongodb/schema/user.model';
import { UserEntity as UserEntityMysql } from 'src/modules/user/infrastructure/database/mysql/entities/user.entity';
import { UserEntity as UserEntityPg } from 'src/modules/user/infrastructure/database/postgresql/entities/user.entity';
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
    name: UserModel.name,
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
