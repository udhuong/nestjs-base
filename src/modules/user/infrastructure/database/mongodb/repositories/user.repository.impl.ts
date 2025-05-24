import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRepository } from 'src/modules/user/domain/contracts/user.repository';
import { User } from 'src/modules/user/domain/entities/user';
import { UserStatus } from 'src/modules/user/domain/value-objects/user-status';
import { UserModel, UserSchemaName } from 'src/modules/user/infrastructure/database/mongodb/schema/user.schema';
import { CONNECTION } from 'src/modules/user/user-type';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(@InjectModel(UserSchemaName, CONNECTION.MONGODB) private readonly userModel: Model<UserModel>) {}

  async findById(id: number): Promise<User | null> {
    if (!id) {
      return null;
    }
  }

  async findByUsername(username: string): Promise<User | null> {
    if (!username) {
      return null;
    }
  }

  async create(user: User): Promise<number> {
    if (!user) {
      return null;
    }
  }

  async update(user: User): Promise<void> {
    if (!user) {
      return null;
    }
  }

  async updateStatus(id: number, status: UserStatus): Promise<void> {
    if (!id || !status) {
      return;
    }
  }

  async findAll(pagination: { page: number; limit: number }): Promise<{ data: User[]; total: number }> {
    if (!pagination) {
      return { data: [], total: 0 };
    }
  }
}
